import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/Author';

class BookForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: (this.props.book) ? this.props.book.id : "",
      name: (this.props.book) ? this.props.book.name : "",
      genre: (this.props.book) ? this.props.genre : "",
      authorId: ""
    }
  }

  onChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) =>{
    e.preventDefault();
    const { id, name, genre, authorId } = this.state;
    const formData = {
      id,
      name,
      genre,
      authorId
    }
    console.log(`onSubmit: ${formData}`);
    this.props.onSubmit(formData);
  }

  displayAuthors(){
    const { loading, authors } = this.props.data;
    if(loading) return (<option>...Loading</option>);
    return authors.map((author) =>{
      return (
        <option key={author.id}>{author.name}</option>
      )
    })
  }

  render(){
    console.log(this.props);

    return(
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <label>Book name:</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onChange} />
          </div>

          <div className="field">
            <label>Genre:</label>
            <input type="text" name="genre" value={this.state.genre} onChange={this.onChange} />
          </div>

          <div>
            <label>Author:</label>
            <select name="authorId" onChange={this.onChange}>
              <option>Select Author</option>
              {this.displayAuthors()}
            </select>
          </div>

          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default graphql(getAuthorsQuery)(BookForm);