import React from 'react'
import BookChanger from "./BookChanger";
import PropTypes from 'prop-types';

const Book = (props) => {
    const {title, authors, img} = props

    return <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${img})`}}></div>
            <BookChanger/>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>

    </div>
}

Book.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    img: PropTypes.string.isRequired
}

export default Book;