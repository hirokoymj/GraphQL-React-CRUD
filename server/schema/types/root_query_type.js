const graphql = require('graphql');
const BookType = require('./book_type');
const AuthorType = require('./author_type');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
} = graphql;
// mongoDB models
const Book = require('../../models/book');
const Author = require('../../models/author');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },
    author:{
      type: AuthorType,
      args:{id: {type: GraphQLID}},
      resolve(parent, args){
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return Book.find({});
      }
    },
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(){
        return Author.find({});
      }
    }
  },
});

module.exports = RootQueryType;