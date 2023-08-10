import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
async function dataRequest(action, options) {
    const result = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/data-yrulb/endpoint/data/v1/action/${action}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": "ieiBeLsXQ67h0KTo71Jg1WI3zjtfMvKm9YuAs95DvVY738183nHWm6ZV5X4QUAat",
        },
        body: JSON.stringify({
            dataSource: "Cluster0",
            database: "Graphql-backend",
            collection: "SocialNetwork",
            ...options,
        }),
    }).then((res) => res.json());
    return result;
}
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
            return dataRequest("find", {});
        },
        getOnePost: () => {
            return null;
        },
    },
    Mutation: {
        createPost: async (_, args) => {
            const { text } = args;
            const result = await dataRequest("insertOne", {
                text: text,
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
// async function getAllData(req: Request, res: Response): Promise<void> {
//   const result = await dataRequest("find", {});
//   res.status(200).json(result);
// }
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
try {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}
catch (error) {
    console.log(error);
}
