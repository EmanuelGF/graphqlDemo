import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import {getBookQuery} from '../Queries/Queries'

export default function BookList(props) {
    const {loading, error, data} = useQuery(getBookQuery, {
        variables: {
            id: props.bookId
        }
    })

    function displayBookDetails(){
        const {book} = data
        if(book){
            return (
                <div id="book-details"> 
                    <ul id="detail-list" key={book.id}>
                        <h3>Details for: {book.name}</h3>
                        <li><small>Genre: {book.genre}</small></li>
                        <li><small>Author Info: </small></li>
                        <li><small>Name: {book.author.name} </small></li>
                        <li><small>Age: {book.author.age}</small></li>
                        <li><small>Other books by {book.author.name}:</small></li>
                        {book.author.books.map(book =>(
                            <ul key={book.id}>
                                <li><small>{book.name}</small></li>
                            </ul>
                        ))}
                    </ul>
                </div>
            )
        } 
    }


    if (error) {
        return <p>Error :(</p>;
    }
    if (loading) {
        return <p>Loading Books</p>;
    } else {
        return (
        <>{displayBookDetails()}</>
            
        )
    }
    
}

