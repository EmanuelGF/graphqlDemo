import React from 'react'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

//Queries
const getBooksQuery = gql`
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

function BookList() {
    const {loading, error, data} = useQuery(getBooksQuery);

    
    if (error) return <p>Error :(</p>;
    if (loading) {
        return <p>Loading Books</p>;
    } else {
        return (
            <div>
                {data.books.map((book) => (
                    
                    <ul id="book-list" key={book.id}>
                        <li><b>Title:</b> {book.name}</li>
                        <li><b>Genre:</b> {book.genre}</li>
                        <li><b>By:</b> {book.author.name}</li>
                    </ul>
                ))}
                
            </div>
        )
    }
    
}

export default BookList; 