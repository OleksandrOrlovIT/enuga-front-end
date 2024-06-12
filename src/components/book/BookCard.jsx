import React from 'react';
import CustomCard from "../common/CustomCard";

function BookCard({book}) {
    const heading = `"${book.title}" by ${book.author}`;
    const page = 1;

    return (
        <CustomCard heading={heading} linkToGet={`/books/${book.id}/page/${page}`} maxWidth={'400px'}/>
    );
}

export default BookCard;