<template>
  <v-menu offset-y>
    <template #activator="data">
      <v-btn
        icon
        v-on="data.on"
      >
        <v-icon>fa fa-language</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-tile
        v-for="item in $config.supportedLanguages"
        :key="item.locale"
        @click="$i18n.locale = item.locale"
      >
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"/>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon v-if="item.locale == $i18n.locale">done</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-menu>

</template>
