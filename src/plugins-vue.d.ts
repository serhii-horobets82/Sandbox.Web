import Vue from "vue";

// extend Vue object with custom properties
declare module "vue/types/vue" {
  interface Vue {
    $auth: any;
    $config: any;
    $appTitle: string;
    $backendUrl: string;
  }
}
