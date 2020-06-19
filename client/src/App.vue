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

          <v-list-item v-if="user" @click="handleSignoutUser">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Signout</v-list-item-title>
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
          v-model="searchTerm"
          @input="handleSearchPosts"
          flex
          prepend-icon="mdi-magnify"
          placeholder="Search posts"
          color="accent"
          single-line
          hide-details
        ></v-text-field>

        <v-card dark v-if="searchResults.length" id="search__card">
          <v-list nav dense>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="result in searchResults"
                :key="result._id"
                @click="goToSearchResult(result._id)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{result.title}} -
                    <span
                      class="font-weight-thin"
                    >{{formatDescription(result.description)}}</span>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon v-if="checkIfUserFavorite(result._id)">
                  <v-icon>mdi-favorite</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn text v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
            <v-icon left class="hidden-sm-only">{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>

          <v-btn text to="/profile" v-if="user">
            <v-icon class="hidden-sm-only" left>mdi-account</v-icon>

            <v-badge right color="blue darken-2" :class="{ 'bounce': badgeAnimated }">
              <span slot="badge" v-if="userFavorites.length">{{userFavorites.length}}</span>
              Profile
            </v-badge>
          </v-btn>

          <v-btn text v-if="user" @click="handleSignoutUser">
            <v-icon class="hidden-sm-only" left>mdi-exit-to-app</v-icon>Signout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>

    <main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view />
        </transition>

        <v-snackbar v-model="authSnackbar" color="success" :timeout="5000" bottom left>
          <v-icon class="mr-3">mdi-check</v-icon>

          <h3>You are now signed in!</h3>
          <v-btn dark text @click="authSnackbar = false">Close</v-btn>
        </v-snackbar>

        <v-snackbar
          v-if="authError"
          v-model="authErrorSnackbar"
          color="info"
          :timeout="5000"
          bottom
          left
        >
          <v-icon class="mr-3">mdi-cancel</v-icon>

          <h3>{{authError.message}}</h3>
          <v-btn dark text to="/signin">Sign in</v-btn>
        </v-snackbar>
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
      searchTerm: "",
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false,
      badgeAnimated: false
    };
  },
  watch: {
    user(newValue, oldValue) {
      if (oldValue === null) {
        this.authSnackbar = true;
      }
    },
    authError(value) {
      if (value !== null) {
        this.authErrorSnackbar = true;
      }
    },
    userFavorites(value) {
      if (value) {
        this.badgeAnimated = true;
        setTimeout(() => (this.badgeAnimated = false), 1000);
      }
    }
  },
  computed: {
    ...mapGetters(["searchResults", "authError", "user", "userFavorites"]),
    horizontalNavItems() {
      let items = [
        { icon: "mdi-chat", title: "Posts", link: "/posts" },
        { icon: "mdi-login", title: "Sign In", link: "/signin" },
        { icon: "mdi-account-plus", title: "Sign up", link: "/signup" }
      ];

      if (this.user) {
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
          { icon: "mdi-account", title: "Profile", link: "/profile" }
        ];
      }

      return items;
    }
  },
  methods: {
    handleSearchPosts() {
      this.$store.dispatch("searchPosts", {
        searchTerm: this.searchTerm
      });
    },
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    },
    goToSearchResult(resultId) {
      this.searchTerm = "";
      this.$router.push(`/posts/${resultId}`);
      this.$store.commit("clearSearchResults");
    },
    formatDescription(desc) {
      return desc.length > 30 ? `${desc.slice(0, 30)}...` : desc;
    },
    checkIfUserFavorite(resultId) {
      return (
        this.userFavorites &&
        this.userFavorites.some(fave => fave._id === resultId)
      );
    },
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

#search__card {
  left: 0%;
  position: absolute;
  top: 100%;
  width: 100vw;
  z-index: 8;
}

.bounce {
  animation: bounce 1s both;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>