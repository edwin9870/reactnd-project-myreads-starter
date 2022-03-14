import React, {Component} from "react";
import {Link} from "react-router-dom";
import * as BookAPI from './BooksAPI'
import * as BooksAPI from './BooksAPI'
import BookShelf from "./BookShelf";
import PropTypes from "prop-types";
import book from "./Book";

class Search extends Component {

    timeout = 0;

    state = {
        books: []
    }

    onSearchTextChange = (e) => {
        const textToSearch = e.target.value;
        if (this.timeout) clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            if (textToSearch == null || textToSearch.length === 0) {
                this.clearBookList();
                return
            }

            this.searchBooks(textToSearch)
        }, 1000);

    }


    clearBookList() {
        this.setState({
            books: []
        })
    }

    changeBookCategory = (bookId, shelf) => {
        const booksPromise = new Promise((resolve => {
            const books = this.state.books.map(e => {
                if (e.id === bookId) {
                    e.shelf = shelf
                }

                return e;
            })
            resolve(books)
        }));

        booksPromise
            .then(data => {
                this.setState({
                    books: data
                })
            })
            .then(() => this.props.changeBookCategory(bookId, shelf))


    }

    searchBooks(textToSearch) {
        const searchResultBooksPromise = BookAPI.search(textToSearch);
        const currentBooksPromise = BooksAPI.getAll();
        Promise.all([searchResultBooksPromise, currentBooksPromise])
            .then(data => {
                const searchResultBooks = data[0]
                const currentBooks = data[1]

                if(searchResultBooks.error !== undefined)
                    throw new Error(searchResultBooks.error)

                return searchResultBooks.map(book => {
                    const currentBook = currentBooks.find(e => e.id === book.id)
                    if (currentBook !== undefined) {
                        book.shelf = currentBook.shelf
                    }
                    return book;
                });
            })
            .then((data) => {
                this.setState({
                    books: data
                })
            }).catch(error => {
            console.error(`Error while trying to get books. Errors: ${error}`)
            this.clearBookList()

        })
    }

    render() {

        return <div className="search-books">
            <div className="search-books-bar">

                <Link to="/">
                    <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                    {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                    <input type="text" onChange={this.onSearchTextChange} placeholder="Search by title or author"/>

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid"></ol>
            </div>
            {this.state.books !== null && this.state.books.length > 0 &&
                <BookShelf books={this.state.books} changeBookCategory={this.changeBookCategory}/>}
        </div>
    }
}

Search.propTypes = {
    changeBookCategory: PropTypes.func.isRequired
}

export default Search;