import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const typeDefs = `#graphql
  type Country {
   phone:Int
    currency: String
    code: String
    name: String
  }
  type Query {
    countries: [Country],
    country(code :String):Country
  }
`;
const sampleCountries = [
    {
        "name": "Andorra",
        "phone": "376",
        "currency": "EUR",
        "code": "AD"
    },
    {
        "name": "United Arab Emirates",
        "phone": "971",
        "currency": "AED",
        "code": "AE"
    },
    {
        "name": "Afghanistan",
        "phone": "93",
        "currency": "AFN",
        "code": "AF"
    },
    {
        "name": "Antigua and Barbuda",
        "phone": "1268",
        "currency": "XCD",
        "code": "AG"
    },
    {
        "name": "Anguilla",
        "phone": "1264",
        "currency": "XCD",
        "code": "AI"
    },
    {
        "name": "Albania",
        "phone": "355",
        "currency": "ALL",
        "code": "AL"
    },
    {
        "name": "Armenia",
        "phone": "374",
        "currency": "AMD",
        "code": "AM"
    },
    {
        "name": "Angola",
        "phone": "244",
        "currency": "AOA",
        "code": "AO"
    },
    {
        "name": "Antarctica",
        "phone": "672",
        "currency": null,
        "code": "AQ"
    },
    {
        "name": "Argentina",
        "phone": "54",
        "currency": "ARS",
        "code": "AR"
    },
    {
        "name": "American Samoa",
        "phone": "1684",
        "currency": "USD",
        "code": "AS"
    },
];
const resolvers = {
    Query: {
        countries: () => {
            return sampleCountries;
        },
        country: (_, args) => {
            console.log({ args });
            return sampleCountries.find((country) => country.code === args.code);
        }
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
