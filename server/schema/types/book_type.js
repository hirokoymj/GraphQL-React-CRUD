const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;
const Author = require('../../models/author');


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author:{
      type: AuthorType,
      resolve(parent, args){
        console.log(parent);
        return Author.findById(parent.authorId);
      }
    }
  })
});

module.exports = BookType;
const AuthorType = require('./author_type');
