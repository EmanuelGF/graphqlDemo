import React, { useState } from 'react'
import {useQuery} from '@apollo/react-hooks'
import {getBooksQuery} from '../Queries/Queries'

import BookDetails from '../BookDetails/BookDetails'

function BookList() {
    const {loading, error, data} = useQuery(getBooksQuery);
    const [details, setDetails] = useState("")


    if (error) return <p>Error :(</p>;
    if (loading) {
        return <p>Loading Books</p>;
    } else {
        return (
            <div>
                {data.books.map((book) => (  
                    <ul id="book-list" key={book.id}>
                        <li onClick={(e) => setDetails(book.id)}><b>Title:</b> {book.name}</li>
                        
                    </ul>
                    
                ))}
                <BookDetails bookId={details} />
                
            </div>
        )
    }
    
}

export default BookList; 