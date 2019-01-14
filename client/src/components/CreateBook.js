import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {addBookMutation, getBooksQuery} from '../queries/Book';

class CreateBook extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: ""
    }
  }
  handleInput = (e) =>{
    this.setState(({
      title: e.target.value
    }))
  }
  onSubmit = (e) =>{
    e.preventDefault();
    console.log("TITLE:", this.state.title);
    this.props.mutate({
      variables: {name: this.state.title},
      refetchQueries: [ {query: getBooksQuery} ]
    }).then(()=>{this.props.history.push('/')});
  }

  render(){
    //console.log(this.props); //check mutate function
    return(
      <div>
        <h1>Create a book</h1>
        <form onSubmit={this.onSubmit}>
          <label>Title Name:</label>
          <input type="text" name="title" onChange={this.handleInput} />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

//Bond mutation with component
export default graphql(addBookMutation)(CreateBook);

