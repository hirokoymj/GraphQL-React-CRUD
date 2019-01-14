const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull
} = graphql;
const BookType = require('./types/book_type');
const AuthorType = require('./types/author_type');
// mongoDB models
const Book = require('../models/book');
const Author = require('../models/author');


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: GraphQLString},
        authorId: {type: GraphQLID},
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    },
    deleteBook:{
      type: BookType,
      args:{
        id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        // return Book.findOneAndDelete({"_id": args.id}, (err, book)=>{
        //   return book;
        // });
        const removedBook = Book.findByIdAndRemove(args.id).exec();
        if (!removedBook) {
          throw new Error('Error')
        }
        return removedBook;
      }
    },
    editBook: {
      type: BookType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString}
      },
      resolve(parent, args){
        const {id, name} = args;
        const update = {
          name: name
        }
        // Book.findOneAndUpdate({"_id": id}, update, {new: true}, (err, book)=>{
        //   console.log()
        //   if(err) throw err;
        //   //if(!book) return res.status(404).send('Can not find data');
        //   return book;
        // });
        
        // return Book.findByIdAndUpdate(
        //   id,
        //   { $set: { name: name } },
        //   { new: true }
        // ).catch(err => new Error(err)); 

        return Book.findByIdAndUpdate(
          id,
          update,
          { new: true }
        ).catch(err => new Error(err));                       

      }
    },
    addAuthor:{
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
  }
});

module.exports = mutation;