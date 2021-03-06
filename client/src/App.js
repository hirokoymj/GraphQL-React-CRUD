import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import AppRouter from './router/AppRouter';

// apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppRouter/>
      </ApolloProvider>
    );
  }
}

export default App;
