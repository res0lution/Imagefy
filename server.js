const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const User = require("./models/User");
const Post = require("./models/Post");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: "./.env" });

const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

const resolvers = {
  Query: {
    getTodos: () => {
      return todos;
    },
  },
  Mutation: {
    addTodo: (_, args) => {
      const todo = { task: args.task, completed: args.completed };
      todos.push(todo);
      return todo;
    },
  },
};

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
