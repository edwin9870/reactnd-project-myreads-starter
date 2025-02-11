import React from 'react'
import BookChanger from "./BookChanger";
import PropTypes from 'prop-types';

const Book = (props) => {
    const {title, authors, imageLinks, shelf, id} = props.book

    return <div className="book">
        <div className="book-top">
            <div className="book-cover"
                 style={{width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})`}}></div>
            <BookChanger shelf={shelf} newValueBookCategory={(newCategory) => {
                props.changeBookCategory(id, newCategory)
            }}/>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>

    </div>
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    changeBookCategory: PropTypes.func.isRequired
}

export default Book;