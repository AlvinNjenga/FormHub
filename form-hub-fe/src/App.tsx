import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Dashboard from './views/Dashboard';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  );
}

export default App;
