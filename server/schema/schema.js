const graphql = require('graphql');
const _ = require('lodash');

const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLSchema,
        GraphQLID,
        GraphQLList
    } = graphql;

//test data 
const books = [
    {name: 'Singularidade', genre: 'scfy', id: '1', authorId: '1'},
    {name: 'Player', genre: 'Romance', id: '2', authorId: '2'},
    {name: 'Ready player one', genre: 'scfy', id: '3', authorId: '3'},
    {name: 'love poems', genre: 'romance', id: '4', authorId: '2'},
    {name: 'Earth2.0', genre: 'scfy', id: '5', authorId: '2'},
    {name: 'zero sum game', genre: 'scfy', id: '6', authorId: '2'}
];

const authors = [
    {name: 'EmanuelGF', age: '36', id: '1'},
    {name: 'author 2', age: '40', id: '2'},
    {name: 'aurhor 3', age: '40', id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({ //Is in a function because it will only be executed later on after the whole file is run
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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //codigo para ir buscar codigo à base de dados.
                return _.find(books, {id: args.id});
            }
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //codigo para ir buscar codigo à base de dados.
                return books
            }
        },

        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //codigo para ir buscar codigo à base de dados.
                return _.find(authors, {id: args.id});
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //codigo para ir buscar codigo à base de dados.
                return authors
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
