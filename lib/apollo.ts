import { ApolloClient, InMemoryCache } from "@apollo/client";

const appoloClient = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export default appoloClient;
