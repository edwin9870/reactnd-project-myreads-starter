import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Book from "./Book";

class BookShelf extends Component {

    render() {
        const {title, books} = this.props
        return <div className="bookshelf">
            {title !== undefined && <h2 className="bookshelf-title">{title}</h2>}
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(e => e.imageLinks !== undefined).map(book => <li key={book.id}>
                        <Book book={book} changeBookCategory={this.props.changeBookCategory}/>
                    </li>)}
                </ol>
            </div>
        </div>
    }
}

BookShelf.propTypes = {
    title: PropTypes.string,
    books: PropTypes.array.isRequired,
    changeBookCategory: PropTypes.func.isRequired
}

export default BookShelf;

