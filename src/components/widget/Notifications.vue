<template>
  <v-menu bottom left offset-y
    :close-on-content-click="false"
    content-class="dropdown-menu" transition="slide-y-transition"
    min-width="400">
    <v-btn icon slot="activator" class="mx-2">
      <v-badge color="error" overlap>
        <template slot="badge" v-if="count">{{ count }}</template>
        <v-icon color="secondary">notifications</v-icon>
      </v-badge>
    </v-btn>

    <v-card class="notification-menu">
      <v-card-title>Notification</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <v-list two-line class="pa-0">
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :key="index"></v-divider>
            <v-list-tile avatar v-else :key="item.title" @click="handleClick(item)"
              :class="{inactive: !item.active}">
              <v-list-tile-avatar :color="item.color">
                <v-icon dark>{{item.icon}}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content class="pr-3">
                <v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action class="caption">
                <v-layout row>
                  <v-flex xs12>
                    {{item.timeLabel | formatDateTimeHuman}}
                  </v-flex>
                  <v-flex v-if="!item.active" class="pl-2">
                    <v-icon small>check</v-icon>
                  </v-flex>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
        <v-divider></v-divider>
        <v-btn block color="tertiary" flat class="ma-0">All</v-btn>
        <v-divider></v-divider>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import notes from "@/data/notification";
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

export default {
  data: () => ({
    connection: null,
    items: [],
  }),

  async created(){
    this.items = await this.$http.get(`api/Notifications`).then(d => d.data)
      .then(d => d.map(n => ({
        title: n.message,
        date: n.createdDate,
        id: n.id,
        timeLabel: n.createdDate,
        active: n.active,
        color: n.active ? 'light-green' : 'grey lighten-2',
        icon: 'account_circle',
      })));

    const connection = new HubConnectionBuilder()
      .withUrl(this.$backendUrl + 'hubs/notification-hub', { accessTokenFactory: () => localStorage["auth-token"] })
      .configureLogging(LogLevel.Information)
      .build()

    connection.start()
      .catch((err) => console.error(err.toSting()));

    connection.on('SendNotification', (payload) => {
      this.items.push({
        title: payload.message,
        date: payload.createdDate,
        id: payload.id,
        timeLabel: d.createdDate,
        active: true,
        color: 'light-green',
        icon: 'account_circle',
      })
    });
    this.connection = connection;
  },
  beforeDestroy(){
    // this.connection.off('SendNotification')
  },

  methods: {
    async handleClick(notification) {
      if (notification.active) {
        await this.$http.post(`api/Notifications/${notification.id}/read`);
        notification.active = false;
        notification.color = 'grey lighten-2'
      }
    },
  },
  computed: {
    count() {
      return this.items.filter(i => i.title && i.active).length
    }
  }
};
</script>

<style lang="scss">
  .notification-menu {

    .inactive {
      a.v-list__tile {
        cursor: default;
      }
    }

  }
</style>
