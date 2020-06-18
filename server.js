const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const User = require("./models/User");
const Post = require("./models/Post");
const resolvers = require("./resolvers");
require("dotenv").config({ path: "./.env" });

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { User, Post },
});

server.listen().then(({ url }) => {
  console.log(`Alive on ${url}`);
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to db!"))
  .catch((err) => console.log(`Error! Could not connect to db! ${err}`));
