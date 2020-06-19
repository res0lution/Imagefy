import Vue from "vue";
import Vuex from "vuex";

import { defaultClient as ApolloClient } from "../main";
import { GET_CURRENT_USER, GET_POSTS, SIGNIN_USER } from "../queries";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    clearUser: (state) => (state.user = null),
  },
  actions: {
    getPosts: ({ commit }) => {
      commit("setLoading", true);

      ApolloClient.query({
        query: GET_POSTS,
      })
        .then(({ data }) => {
          commit("setPosts", data.getPosts);
          commit("setLoading", false);
        })
        .catch((err) => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    getCurrentUser: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_CURRENT_USER,
        })
        .then(({ data }) => {
          commit("setLoading", false);
          commit("setUser", data.getCurrentUser);
          console.log(data.getCurrentUser);
        })
        .catch((err) => {
          commit("setLoading", false);
          console.error(err);
        });
    },
    signinUser: ({ commit }, payload) => {
      localStorage.setItem("token", "");
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload,
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.signinUser.token);
          router.go();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    signoutUser: async ({ commit }) => {
      commit("clearUser");
      localStorage.setItem("token", "");
      await apolloClient.resetStore();
      router.push("/");
    },
  },
  getters: {
    posts: (state) => state.posts,
    loading: (state) => state.loading,
    user: (state) => state.user,
  },
  modules: {},
});
