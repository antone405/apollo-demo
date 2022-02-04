import React from "react";
import { render } from "react-dom";
import { MsalProvider, useMsalAuthentication } from "@azure/msal-react";
import { Configuration,  PublicClientApplication } from "@azure/msal-browser";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


// Component
const AppProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

const client = new ApolloClient({
  uri: "https://apollo-example-aysandbox.azurewebsites.net/graphql?code=KPuPL6pdBQfps08Lpr2cUKWrRwYd12x6h6CfDyaj8QaySma2eNqKvg==",
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query GetMessage {
        hello
      }
    `
  })
  .then(result => console.log(result));

  const DEMO_QUERY = gql`
    query GetMessage {
      hello
  }
`;

function GraphReturn() {
  const { loading, error, data } = useQuery(DEMO_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return (
      <div>
        <p>
          {data.hello}
        </p>
      </div>
    );
}

function App() {

  return (
    <div>
      <h2>React Page w/ Apollo</h2>
      <GraphReturn />
    </div>
  );
}
render(
  <ApolloProvider client={client}>
        <App />
  </ApolloProvider>,  document.getElementById('root'),
);