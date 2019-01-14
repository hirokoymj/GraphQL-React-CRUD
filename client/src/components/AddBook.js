import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addBookMutation } from '../queries/Book';
import { getAuthorsQuery } from '../queries/Author';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    }
  }

  displayAuthors() {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (<option>Loading...</option>);
    } else {
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>);
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    const {name, genre, authorId} = this.state;
    console.log(name, genre, authorId);
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId,
      },
      //refetchQueries: [{query: getBooksQuery}]
    });
  }

  render() {
    console.log(this.props);
    
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book Name:</label>
          <input type="text" onChange={e => this.setState({name: e.target.value})}/>
        </div>

        <div className="fields">
          <label>Genre:</label>
          <input type="text" onChange={e => this.setState({genre: e.target.value})}/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({authorId: e.target.value})}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

// stored in component's props
export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
