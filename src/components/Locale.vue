<template>
  <v-select
    v-model="$i18n.locale"
    :items="$supportedLangs"
    hint="Pick your language"
    prepend-icon="language"
  ></v-select>
</template>
