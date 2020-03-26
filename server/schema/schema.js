const graphql = require('graphql');

/**Lodash has helper methods to query the arrays with tha dummy data */
const _ = require('lodash');

const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLSchema,
        GraphQLID,
        GraphQLList,
        GraphQLNonNull //For fields that cannot be null.

    } = graphql;




/************************************************************************************************************* */
//test data - this is done this way only for example purposes. In a real application the data should be persisted in 
// real database system like mySql or mongoDb. Also please keep in mind that everytime the node server is restarted the
// data you saved before is no longer present, only the hardcoded data remains.
const uniqid =require('uniqid') //Create unique ids for user. 

let books = [
    {name: 'Cosmos', genre: 'Cosmology', id: '1', authorId: '1'},
    {name: 'Billions and Billions', genre: 'Cosmology', id: '2', authorId: '1'},
    {name: 'Dune', genre: 'scfy', id: '3', authorId: '3'},
    {name: 'love poems', genre: 'romance', id: '4', authorId: '2'},
    {name: 'Earth 2.0', genre: 'scfy', id: '5', authorId: '2'},
    {name: 'zero sum game', genre: 'scfy', id: '6', authorId: '2'}
];

let authors = [
    {name: 'Carl Sagan', age: '56', id: '1'},
    {name: 'Some Author', age: '40', id: '2'},
    {name: 'Frank Herbert', age: '66', id: '3'}
];
/******************************************************************************************************* */

//*******************************Defining the graphql object types*************************************************************

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({ //Is in a function because it will only be executed later on, after the whole file is run.
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre:  {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age:  {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
});

//*****************************Defining the basic queries************************************************* */



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        //**Get a book based on the suplied id */
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //Code to fetch data from the database.
                return _.find(books, {id: args.id});
            }
        },

        //**Get all the books stored in the database */
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //Code to fetch data from the database.
                return books
            }
        },


        //***Get an author based on the suplied id */
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //Code to fetch data from the database.
                return _.find(authors, {id: args.id});
            }
        },


        //**Get all the authors stored in the database */
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //Code to fetch data from the database.
                return authors
            }
        },
    }
});


//**********************Mutations************************ */

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        

        //**Add an author to the database */
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: { type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let author = {
                    id: uniqid(),
                    name: args.name,
                    age: args.age,
                }
                authors.push(author);
                return author;
            }
        },

        //**Add a book to the database */
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}, 
                genre: { type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let book = {
                    id: uniqid(),
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                }
                books.push(book);
                return book;
            }
        }


    }
})

//**Export queries to be used in the server file */
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
