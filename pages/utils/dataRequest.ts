export default async function dataRequest(action: string, options: object) {
  const result = await fetch(
    `https://ap-southeast-1.aws.data.mongodb-api.com/app/data-yrulb/endpoint/data/v1/action/${action}`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key":
          "ieiBeLsXQ67h0KTo71Jg1WI3zjtfMvKm9YuAs95DvVY738183nHWm6ZV5X4QUAat",
      },
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: "Graphql-backend",
        collection: "SocialNetwork",
        ...options,
      }),
    }
  ).then((res) => res.json());
  return result;
}
