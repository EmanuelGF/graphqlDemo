import {gql} from 'apollo-boost'

export const getAuthorsQuery = gql`
    {
        authors{
            id
            name 
        }
    }
`

export const getBooksQuery = gql`
    {
        books{
            id
            name 
            genre
            author{
                name 
            }
        }
    }
`

export const addBookMutation = gql` 
    mutation AddBook($name: String!, $genre: String!, $authorId: String!){
    addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`