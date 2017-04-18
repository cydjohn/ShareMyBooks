import React from 'react';

export default class Singlebook extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <article>
                <h4><strong>Book Id:</strong> <em> {this.props.book.bookID}</em></h4>
                <h4><strong>uploadedBy:</strong> <em> {this.props.book.uploadedBy}</em></h4>
                <h4><strong>Title:</strong> <em> {this.props.book.Title}</em></h4>
                <h4><strong>Author:</strong> <em> {this.props.book.Author}</em></h4>
            </article>
        );
    }
}


