<template>
  <v-menu bottom left offset-y
    content-class="dropdown-menu" transition="slide-y-transition"
    min-width="400">
    <v-btn icon slot="activator" class="mx-3">
      <v-badge color="error" overlap>
        <template slot="badge" v-if="count">{{ count }}</template>
        <v-icon color="secondary">notifications</v-icon>
      </v-badge>
    </v-btn>

    <v-card>
      <v-card-title>Notification</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <v-list two-line class="pa-0">
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :key="index"></v-divider>
            <v-list-tile avatar v-else :key="item.title" @click="handleClick">
              <v-list-tile-avatar :color="item.color">
                <v-icon dark>{{item.icon}}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action class="caption">{{item.timeLabel}}</v-list-tile-action>
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
    items: notes,
  }),
  async created(){
    const connection = new HubConnectionBuilder()
      .withUrl(this.$backendUrl + 'hubs/notification-hub', { accessTokenFactory: () => localStorage["auth-token"] })
      .configureLogging(LogLevel.Information)
      .build()

    connection.start()
      .catch((err) => console.error(err.toSting()));
    connection.on('SendTestNotification', (payload) => {
      let title = payload.template;
      for(let key in payload.data) {
        title = title.replace('${' + key + '}', payload.data[key])
      }
      this.items.push({
        title: title,
        color: 'light-green',
        icon: 'account_circle',
      })
    });
    // connection.send('SendNotification', 'ddddddddddddddddddddddddddddddddd')
    this.connection = connection;
  },
  beforeDestroy(){
    // this.connection.off('SendNotification')
  },

  methods: {
    handleClick: e => {}
  },
  computed: {
    count() {
      return this.items.filter(i => i.title).length
    }
  }
};
</script>
