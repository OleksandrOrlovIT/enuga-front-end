import React from 'react';
import CustomCard from "../common/CustomCard";
import api from "../auth/api";

function BookCard({book, onDelete}) {
    const heading = `"${book.title}" by ${book.author}`;
    const page = 1;

    const deleteBook = () => {
        api.delete(`/book/${book.id}`)
            .then(() => {
                console.log(`Successfully deleted book with ID ${book.id}`);
                onDelete(book.id);
            })
            .catch(err => {
                console.log(`Error deleting book with ID ${book.id}`, err);
            });
    }

    return (
        <CustomCard heading={heading} linkToGet={`/books/${book.id}/page/${page}`}
                    maxWidth={'400px'} deleteFunc={deleteBook}/>
    );
}

export default BookCard;