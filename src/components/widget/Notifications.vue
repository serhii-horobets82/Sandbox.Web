<template>
  <v-menu bottom left offset-y content-class="dropdown-menu" transition="slide-y-transition">
    <v-btn icon slot="activator" class="mx-3">
      <v-badge color="error" overlap>
        <template slot="badge">{{ count }}</template>
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

export default {
  data: () => ({
    items: notes,
    count: notes.filter(i => i.title).length
  }),
  methods: {
    handleClick: e => {}
  }
};
</script>
