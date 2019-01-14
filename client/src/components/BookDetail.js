import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/Book'; 

class BookDetail extends Component{

  render(){
    console.log(this.props);
    //console.log(this.props.match.params.id);
    const { book } = this.props.data;
    if(!book) { return <div>Loading...</div>;}
    return(
      <div>
        <h1>Book Detail</h1>
        <p>Book Name: {book.name}</p>
        <p>Book ID: {book.id}</p>
      </div>
    )
  }
}

export default graphql(getBookQuery, {
  options: (props) => { return { variables: {id: props.match.params.id } } }
})(BookDetail);