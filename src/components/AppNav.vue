<template>
  <nav>
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      absolute
      v-model="drawer">
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}11
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile :to="item.to" v-else :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed>

      <v-toolbar-title style="width: 200px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span>EvoFlare</span>
      </v-toolbar-title>

      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template #activator="data">
          <v-btn v-on="data.on" icon to="/">
            <v-icon>home</v-icon>
          </v-btn>
        </template>
        <span>Home</span>
      </v-tooltip>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/evaluation">Evaluation</v-btn>
        <v-btn flat to="/okr">OKR</v-btn>
      </v-toolbar-items>
      <v-tooltip bottom>
        <template #activator="data">
          <v-btn v-on="data.on" icon to="/about">
            <v-icon>info</v-icon>
          </v-btn>
        </template>
        <span>About</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="data">
          <v-btn v-on="data.on" icon to="/auth">
            <v-icon>lock</v-icon>
          </v-btn>
        </template>
        <span>Authorization</span>
      </v-tooltip>

    </v-toolbar>
  </nav>
</template>

<script>
  export default {
    name: 'AppNavigation',
    data: () => ({
      drawer: false,
      items: [
        {icon: 'info', text: 'Home', to: '/'},
        {icon: 'info', text: 'Evaluation', to:'/evaluation'},
        {icon: 'info', text: 'OKR', to:'/okr'}
      ]
    }),
  }
</script>

<style scoped>
</style>
