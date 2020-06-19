import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/Home.vue";
import Profile from "../components/auth/Profile.vue";
import Posts from "../components/post/Posts.vue";
import AddPosts from "../components/post/AddPost.vue";
import Signin from "../components/auth/Signin.vue";
import Signup from "../components/auth/Signup.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/post/add",
    name: "Posts",
    component: AddPosts,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Singup",
    component: Signup,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
