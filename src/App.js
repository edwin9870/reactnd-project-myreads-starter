import React from 'react'
import './App.css'
import ListBookContent from "./ListBookContent";
import * as BooksAPI from './BooksAPI';
import {Route, Routes, BrowserRouter as Router, Link} from "react-router-dom";
import Search from "./Search";

class BooksApp extends React.Component {
    state = {
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
                                    <Link to="/search">
                                        <button>Add a book</button>
                                    </Link>
                                </div>
                            </div>
                        }/>

                        <Route path="/search" element={<Search changeBookCategory={this.changeBookCategory} />}/>
                    </Routes>
                </Router>
            </div>
        )
    }
}

export default BooksApp
