import { ApolloServer } from "@apollo/server";
import dataRequest from "../utils/dataRequest";
import { startStandaloneServer } from "@apollo/server/standalone";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
const typeDefs = `#graphql
      type Post {
      text:String
      image:[String]
      userId:String
      createdAt:String
      }
      input PostCreateInput {
      text:String
        
  }
  input PostUpdateInput {
    text:String
    userId:String
  }
  input PostDeleteInput {
      userId:String
  }
    type Query {
    getAllPost: [Post]
    getOnePost: Post
    }
  
    type Mutation{
      createPost(createInput: PostCreateInput!):Post
      updatePost(id:ID!,updateInput: PostUpdateInput!):Post
      deletePost(id:ID!):Post
    }
  `;
const resolvers = {
  Query: {
    getAllPost: () => {
      return "ho";
    },
    getOnePost: () => {
      return null;
    },
  },
  Mutation: {
    createPost: async (_: any, args: any) => {
      const { text } = args;
      const result = await dataRequest("insertOne", {
        data: {
          text: text,
        },
      });
      return result;
    },
    updatePost: () => {
      return null;
    },
    deletePost: () => {
      return null;
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
