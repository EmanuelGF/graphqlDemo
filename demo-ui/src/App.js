import React from 'react';
import AppolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'

//components
import BookList from './components/BookList'

//Appollo client setup
const client = new AppolloClient({
  uri: 'http://localhost:8888/graphql'
})



function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h2>Graphql demo ✔</h2>
        <BookList />
      </div>
    </ApolloProvider>
    
  );
}

export default App;
