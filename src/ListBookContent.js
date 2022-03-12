import React, {Component} from 'react'
import BookShelf from "./BookShelf";
import PropTypes from 'prop-types';

class ListBookContent extends Component {

    render() {
        const {books} = this.props
        const booksCurrentlyReading = [], booksWantedToRead = [], booksRead = []

        books.forEach(book => {
            if(book.shelf === 'currentlyReading') {
                booksCurrentlyReading.push(book);
                return
            }

            if(book.shelf === 'wantToRead') {
                booksWantedToRead.push(book);
                return
            }

            booksRead.push(book)
        })
        return <div className="list-books-content">
            <div>
                <BookShelf title="Currently Reading" books={booksCurrentlyReading} changeBookCategory={this.props.changeBookCategory} />
                <BookShelf title="Want to Read" books={booksWantedToRead} changeBookCategory={this.props.changeBookCategory}/>
                <BookShelf title="Read" books={booksRead} changeBookCategory={this.props.changeBookCategory} />
            </div>
        </div>
    }

}

ListBookContent.propTypes = {
    books: PropTypes.array.isRequired,
    changeBookCategory: PropTypes.func.isRequired
}

export default ListBookContent;