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

// MSAL configuration
const configuration: Configuration = {
  auth: {
      clientId: "client-id"
  }
};

const pca = new PublicClientApplication(configuration);

// Component
const AppProvider = () => (
  <MsalProvider instance={pca}>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </MsalProvider>
);

const client = new ApolloClient({
  uri: "https://centricec-graphql-func.azurewebsites.net/api/graphql",
  cache: new InMemoryCache()
});

function GraphReturn() {
  const { loading, error, data } = useQuery(gql`{hello}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data => (
    <div key={data}>
      <p>
        {data}
      </p>
    </div>
  );
}

function App() {
  const {login, result, error} = useMsalAuthentication("popup");

  return (
    <div>
      <h2>React Page w/ Apollo</h2>
      <GraphReturn />
    </div>
  );
}

render(<AppProvider />,  document.getElementById("root"));