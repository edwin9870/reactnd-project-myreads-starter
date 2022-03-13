import React, {Component} from "react";
import {Link} from "react-router-dom";
import * as BookAPI from './BooksAPI'

class Search extends Component {

    timeout = 0;
    
    onSearchTextChange = (e) => {
        const textToSearch = e.target.value;
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.searchBooks(textToSearch), 1000);

    }


    searchBooks(textToSearch) {
        const result = BookAPI.search(textToSearch);
        result.then((data) => {
            console.log(`Data returned. Data: ${JSON.stringify(data)}`)
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
        </div>
    }
}

export default Search;