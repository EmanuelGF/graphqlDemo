import React, {useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../Queries/Queries'


export default function AddBook() {
    const {loading, error, data} = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation)

    const [name, setName] =useState()
    const [genre, setGenre] = useState()
    const [authorId, setAuthorId] = useState()

    function submitForm(e){
        e.preventDefault(); //prevent page from refreshing.
        addBook({variables: {
            name: name,
            genre: genre,
            authorId: authorId
        },
        refetchQueries: [{query: getBooksQuery }]
    })
    }

    if (error) return <p>Error :(</p>;
    if (loading) {
        return <p>Loading authors</p>;
    } else {
        return (
            <form id="add-book" onSubmit={submitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => setGenre(e.target.value)} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => setAuthorId(e.target.value)}>
                        <option>Select author</option>
                        {data.authors.map(author => {
                            return (
                                <option key={author.id} value={author.id}>{author.name}</option>
                            )
                        })}
                    </select>
                </div>
                <button>Add to database</button>

            </form>
        )
    }
    
}
