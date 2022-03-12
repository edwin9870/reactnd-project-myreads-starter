import React, {Component} from 'react';
import PropTypes from 'prop-types';

const BookChanger = (props) => {

    const actualCategory = props.shelf

    return <div className="book-shelf-changer">
        <select value={actualCategory}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    </div>

}

BookChanger.propTypes = {
    shelf: PropTypes.string.isRequired
}

export default BookChanger