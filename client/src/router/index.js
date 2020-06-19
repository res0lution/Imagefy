import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/Home.vue";
import Profile from "../components/auth/Profile.vue";
import Posts from "../components/post/Posts.vue";
import Post from "../components/post/Post.vue";
import AddPost from "../components/post/AddPost.vue";
import Signin from "../components/auth/Signin.vue";
import Signup from "../components/auth/Signup.vue";
import AuthGuard from "../utils/AuthGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/posts/:postId",
    name: "Post",
    component: Post,
    props: true,
  },
  {
    path: "/post/add",
    name: "AddPost",
    component: AddPost,
    beforeEnter: AuthGuard,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: AuthGuard,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/Signup",
    name: "Signup",
    component: Signup,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
