import { ApolloServer } from "@apollo/server";
import dataRequest from "../utils/dataRequest";
import { startStandaloneServer } from "@apollo/server/standalone";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
const typeDefs = `#graphql
    type Post {
      text:String
      image:[String]
      createdAt:String
      _id:String
     }
    input PostCreateInput {
      text:String

    }
    input PostUpdateInput {
      text:String

  
    }
    input PostDeleteInput {
      text:String
    }
    type Query {
      getAllPost: [Post]
      getOnePost(id:String): Post
    }
    type Mutation{
      createPost(createInput: PostCreateInput!):ID
      updatePost(id:String,updateInput: PostUpdateInput!):Post
      deletePost(id:String):Post
    }
  `;
const resolvers = {
  Query: {
    getAllPost: async () => {
      const result = await dataRequest(`find`, {});
      return result.documents;
    },
    getOnePost: async (_: never, args: any) => {
      const id = args.id;
      const result = await dataRequest("findOne", {
        filter: { _id: { $oid: id } },
      });
      return result.document;
    },
  },
  Mutation: {
    createPost: async (_: never, args: { createInput: { text: string } }) => {
      const { text } = args.createInput;
      const result = await dataRequest(`insertOne`, {
        document: {
          text,
        },
      });
      return result.insertedId;
    },

    updatePost: async (
      _: never,
      args: {
        id: any;
        updateInput: { text: string; id: string };
      }
    ) => {
      const id = args.id;
      const { text } = args.updateInput;
      const result = await dataRequest("updateOne", {
        filter: { _id: { $oid: id } },
        update: {
          $set: {
            text: text,
          },
        },
      });
      console.log({ result });
      return result;
    },

    deletePost: async (_: never, args: any) => {
      const id = args.id;
      const result = await dataRequest("deleteOne", {
        filter: { _id: { $oid: id } },
      });
      console.log({ result });
      return result;
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
