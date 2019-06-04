import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: "/chat",
    meta: {
      title: "Chat"
    },
    name: "Chat",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `./components/ChatLayout.vue`
      ),
    redirect: {
      path: "/chat/messaging"
    },
    children: [
      {
        path: "/chat/messaging/:uuid?",
        name: "ChatMessaging",
        props: true,
        components: {
          default: () =>
            import(
              /* webpackChunkName: "routes" */
              `./components/ChatMessaging.vue`
            )
        }
      },
      {
        path: "/chat/contact/:uuid?",
        name: "ChatContact",
        components: {
          default: () =>
            import(
              /* webpackChunkName: "routes" */
              `./components/ChatContact.vue`
            )
        }
      }
    ]
  }
];

export default routes;
