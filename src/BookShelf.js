import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Book from "./Book";

class BookShelf extends Component {

    render() {
        const {title, books} = this.props
        return <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => <li key={book.id}>
                        <Book title={book.title} authors={book.authors} img={book.imageLinks.thumbnail} />
                    </li>)}
                </ol>
            </div>
        </div>
    }
}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
}

export default BookShelf;

