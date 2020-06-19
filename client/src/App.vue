<template>
  <v-app style="background: #e3e3ee">
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="accent" dark flat>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">
            <h1 class="title pl-3">ImageFy</h1>
          </router-link>
        </v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="item in sideNavItems" :key="item.title" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="user">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <div>
      <v-toolbar fixed dense color="primary" dark>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>

        <v-toolbar-title class="hidden-xs-only">
          <router-link to="/" tag="span" style="cursor: pointer">ImageFy</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
          flex
          prepend-icon="mdi-magnify"
          placeholder="Search posts"
          color="accent"
          single-line
          hide-details
        ></v-text-field>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn text v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
            <v-icon left class="hidden-sm-only">{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>

          <v-btn text to="/profile" v-if="user">
            <v-icon class="hidden-sm-only" left>account_box</v-icon>
            <v-badge right color="blue darken-2">Profile</v-badge>
          </v-btn>

          <v-btn text v-if="user" @click="handleSignoutUser">
            <v-icon class="hidden-sm-only" left>exit_to_app</v-icon>Signout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>

    <main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    ...mapGetters(["user"]),
    horizontalNavItems() {
      let items = [
        { icon: "mdi-chat", title: "Posts", link: "/posts" },
        { icon: "mdi-login", title: "Sign In", link: "/signin" },
        { icon: "mdi-account-plus", title: "Sign up", link: "/signup" }
      ];

      if (user) {
        items = [{ icon: "mdi-chat", title: "Posts", link: "/posts" }];
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { icon: "mdi-chat", title: "Posts", link: "/posts" },
        { icon: "mdi-login", title: "Sign In", link: "/signin" },
        { icon: "mdi-account-plus", title: "Sign up", link: "/signup" }
      ];

      if (this.user) {
        items = [
          { icon: "mdi-chat", title: "Posts", link: "/posts" },
          { icon: "mdi-plus", title: "Create Post", link: "/post/add" },
          { icon: "mdi-account_box", title: "Profile", link: "/profile" }
        ];
      }
      return items;
    }
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    },
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>