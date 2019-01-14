import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {addBookMutation, getBooksQuery} from '../queries/Book';
import BookForm from './BookForm';

class CreateBookPage extends Component{
  // constructor(props){
  //   super(props);
  // }

  onSubmit = (formData) =>{
    console.log(`CreateBookPage - Submit = ${formData}`);
    const {name, genre, authorId} = formData;

    this.props.mutate({
      variables: {name, genre, authorId},
      refetchQueries: [ {query: getBooksQuery} ]
    }).then(()=>{this.props.history.push('/')});
  }

  render(){
    //console.log(this.props);
    return(
      <div>
        <h1>Create a book page</h1>
        <BookForm history={this.props.history} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default graphql(addBookMutation)(CreateBookPage);

