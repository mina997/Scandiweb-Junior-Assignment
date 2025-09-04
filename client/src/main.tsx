import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/index.css';

/**
 * GraphQL endpoint:
 * The GraphQL endpoint is different in development and production.
 * In development, the server runs on localhost:8000.
 * In production, the client and server run on the same domain, hence using only '/graphql'.
 * The import.meta.env.PROD variable is set automatically by Vite to true in production and false in development.
 */
const graphqlEndpoint = import.meta.env.PROD
  ? '/graphql'
  : 'http://localhost:8000/graphql';

// Apollo Client:
const apolloClient = new ApolloClient({
  uri: graphqlEndpoint,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
      <ToastContainer
        position="bottom-left"
        transition={Slide}
        autoClose={2000}
        hideProgressBar={true}
      />
    </ApolloProvider>
  </React.StrictMode>
);
