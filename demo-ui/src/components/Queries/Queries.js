import {gql} from 'apollo-boost'


export const getBookQuery = gql`
    query($id: String!){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age 
                books{
                    id
                    name
                }
            }
        }
    }
`

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