import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import {getBooksQuery} from '../Queries/Queries'

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