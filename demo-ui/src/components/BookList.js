import React from 'react'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            {data.books.map((book, author) => (
                
                <ul id="book-list" key={book.id}>
                    <li><b>Title:</b> {book.name}</li>
                    <li><b>Genre:</b> {book.genre}</li>
                    <li><b>By:</b> {book.author.name}</li>

                </ul>
            ))}
            
        </div>
    )
}

export default BookList; 