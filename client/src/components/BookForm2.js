import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBooksQuery } from '../queries/Book';
import { getAuthorsQuery } from '../queries/Author';

class BookForm2 extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookId: '',
      authorId: ''
    }
  }

  displayBooks(){
    const {loading, books} = this.props.getBooksQuery;
    if(loading) return (<option>...Loading</option>); 
    return books.map(d =>{
      return(
        <option key={d.id} value={d.id}>{d.name}</option>
      )
    })
  }

  displayAuthors(){
    const {loading, authors} = this.props.getAuthorsQuery;
    if(loading) return (<option>...Loading</option>); 
    return authors.map(d =>{
      return(
        <option key={d.id} value={d.id}>{d.name}</option>
      )
    })
  }

  onSelectChange = (e) =>{
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onSubmit = (e) =>{
    e.preventDefault();
    const {bookId, authorId} = this.state;
    console.log("BookId: ", bookId);
    console.log("AuthorId: ", authorId);
  }

  render(){
    console.log(this.props);
    return(
      <div>
        <h1>Dropdown Test</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Book: </label>
            <select name="bookId" onChange={this.onSelectChange}>
              <option>Select book</option>
              {this.displayBooks()}
            </select>          
          </div>
          <div>
            <label>Author: </label>
            <select name="authorId" onChange={this.onSelectChange}>
              <option>Select author</option>
              {this.displayAuthors()}
            </select>          
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default compose(
  graphql(getBooksQuery, {name: "getBooksQuery"}),
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"})
)(BookForm2);
