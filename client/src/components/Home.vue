<template>
  <v-container v-if="getPosts">
    <v-flex xs12>
      <v-carousel v-bind="{'cycle': true}" interval="3000">
        <v-carousel-item v-for="post in getPosts" :key="post._id" :src="post.imageUrl">
          <h1 id="carousel__title">{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>

    <ApolloQuery :query="getPostsQuery">
      <template slot-scope="{result: { loading, data, error, networkStatus } }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error! {{error}}</div>
        <div v-else-if="!loading">Network status: {{networkStatus}}</div>
        <ul v-else v-for="post in data.getPosts" :key="post._id">
          <li>
            {{post.title}}
            {{post.imageUrl}}
            {{post.description}}
          </li>

          <li>{{likes}}</li>
        </ul>
      </template>
    </ApolloQuery>
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";

export default {
  name: "Home",
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
            imageUrl
            description
            likes
          }
        }
      `
    }
  }
};
</script>

<style>
.carousel__title {
  bottom: 50px;
  background-color: rgba(0,0,0,0.5);
  border-radius: 5px 5px 0 0;
  color: white;
  left: 0;
  margin: 0 auto;
  padding: 0.5em;
  right: 0;
}
</style>
