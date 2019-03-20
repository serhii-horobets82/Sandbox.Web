<template>
  <v-menu bottom left offset-y content-class="dropdown-menu" transition="slide-y-transition">
    <template #activator="data">
      <v-btn icon v-on="data.on" class="toolbar-items">
        <v-icon color="tertiary">fa fa-language</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-tile
        v-for="item in $config.supportedLanguages"
        :key="item.locale"
        @click="$i18n.locale = item.locale"
      >
        <v-list-tile-action>
          <v-icon v-if="item.locale == $i18n.locale">done</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"/>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>
