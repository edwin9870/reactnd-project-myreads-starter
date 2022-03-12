import React, {Component} from 'react'
import BookShelf from "./BookShelf";
import PropTypes from 'prop-types';

class ListBookContent extends Component {

    render() {
        console.log("here")
        const {books} = this.props
        console.log(`books size: ${books.length}`)
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
                <BookShelf title="Currently Reading" books={booksCurrentlyReading} />
                <BookShelf title="Want to Read" books={booksWantedToRead} />
                <BookShelf title="Read" books={booksRead} />
            </div>
        </div>
    }

}

ListBookContent.propTypes = {
    books: PropTypes.array.isRequired
}

export default ListBookContent;