import React from 'react'
import './App.css'
import ListBookContent from "./ListBookContent";
import * as BooksAPI from './BooksAPI';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        books: []
    }

    componentDidMount() {
        this.refreshBooks();

    }

    refreshBooks() {
        const books = BooksAPI.getAll();
        books
            .then(data => {
                    this.setState({
                        books: data
                    })
                    console.log(`Updated books. Books: ${this.state.books.length}`)
                },
                error => {
                    console.error(`Error while calling list of books, error ${error}`)
                })
    }

    changeBookCategory = (bookId, shelf) => {
        console.log(`Book id ${bookId} change to category ${shelf}`)
        const response = BooksAPI.update({id: bookId}, shelf)
        response
            .then(() => this.refreshBooks())
    }

    render() {


        return (
            <div className="app">
                <Router>
                    <Routes>
                        <Route exact path="/" element={
                            <div className="list-books">
                                <div className="list-books-title">
                                    <h1>MyReads</h1>
                                </div>
                                <ListBookContent books={this.state.books}
                                                 changeBookCategory={this.changeBookCategory}/>

                                <div className="open-search">
                                    {/*<button onClick={() => console.log("")}>Add a book</button>*/}
                                    <Link to="/search"><button>Add a book</button></Link>
                                    {/*<Link to="/search">Add a book</Link>*/}
                                </div>
                            </div>
                        }/>

                        <Route path="/search" element={
                            <div className="search-books">
                                <div className="search-books-bar">
                                    <button className="close-search"
                                            onClick={() => this.setState({showSearchPage: false})}>Close
                                    </button>
                                    <div className="search-books-input-wrapper">
                                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                                        <input type="text" placeholder="Search by title or author"/>

                                    </div>
                                </div>
                                <div className="search-books-results">
                                    <ol className="books-grid"></ol>
                                </div>
                            </div>
                        }/>
                    </Routes>
                </Router>
            </div>
        )
    }
}

export default BooksApp
