import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBooksQuery, deleteBookMutation } from '../queries/Book';
import { Link } from 'react-router-dom';

class BookList extends Component{
  onDeleteBook(id){
    this.props.deleteBookMutation({
      variables: {id}
    }).then(()=>{
      this.props.getBooksQuery.refetch();
    })
  }

  showBooks(){
    const {loading, books} = this.props.getBooksQuery;

    if(loading) return (<tr><td>...Loading</td></tr>);
    return books.map(({id, name, genre}) => {
      return(
        <tr key={id}>
          <td><Link to={`books/${id}`}>{name}</Link></td>
          <td>{genre}</td>
          <td><button onClick={() => this.onDeleteBook(id)}>Delete</button></td>
          <td><Link to={`/edit/${id}`}>Edit</Link></td>
        </tr>
      )
    })
  }

  render(){
    console.log(this.props);
    return (
      <div>
        <h1>Book List</h1>
        <table className="bookTable">
        <thead>
        <tr>
          <th>Book Name</th>
          <th>Genre</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
        </thead>
        <tbody>
          {this.showBooks()}        
        </tbody>
        </table>
      </div>
    )
  }
}
 
// export default graphql(deleteBookMutation)(
//   graphql(getBooksQuery)(BookList)
// );

export default compose(
  graphql(getBooksQuery, {name: "getBooksQuery"}),
  graphql(deleteBookMutation, {name: "deleteBookMutation"})
)(BookList);

