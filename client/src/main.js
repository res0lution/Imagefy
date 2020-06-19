import "@babel/polyfill";
import Vue from "vue";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

import vuetify from "@/plugins/vuetify";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import FormAlert from "./components/shared/FormAlert";

Vue.component("form-alert", FormAlert);

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  request: (operation) => {
    if (!localStorage.token) {
      localStorage.setItem("token", "");
    }

    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.error("-[NetworkError]!", networkError);
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
        
        if (err.name === "AuthenticationError") {
          store.commit("setAuthError", err);
          store.dispatch("signoutUser");
        }
      }
    }
  },
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    this.$store.dispatch("getCurrentUser");
  },
}).$mount("#app");
