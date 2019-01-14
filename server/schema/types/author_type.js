const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
const Book = require('../../models/book');

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        console.log('parent', parent);
        return Book.find({authorId: parent.id});
      }
    }
  })
});

module.exports = AuthorType;
const BookType = require('./book_type');
