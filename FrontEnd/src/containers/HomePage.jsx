import React, { PropTypes } from 'react';
// import { Card, CardTitle } from 'material-ui/Card';
import CreateListOfBooks from "../components/CreateListOfBooks.jsx";
import Search from "../components/Search.jsx";
import { getBooks } from "../data/books";
const baseUrl = "http://localhost:3002";
import router from 'react-router';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Books: [],
            keyword: '',
        };
    }

    async componentDidMount() {
        let self = this;
        fetch(`${baseUrl}/books`)
            .then(function (response) {
                return response.json();
            })
            .then((BookList) => {
                self.setState({ Books: BookList })
            })
            .catch(function (error) {
                return error;
            });
    }

    processSearch(event) {
        event.preventDefault();

        let self = this;
        fetch(`${baseUrl}/books/search/` + this.state.keyword)
            .then(function (response) {
                return response.json();
            })
            .then((BookList) => {
                self.setState({ Books: BookList })
            })
            .catch(function (error) {
                return error;
            });
    }
    processInput(event) {
        this.setState({ keyword: event });
    }
    render() {
        if (this.state.Books.length === 0)
            return <div>Loading...</div>;
        return (
            <div className="container">
                <Search
                    onSubmit={this.processSearch.bind(this)}
                    onUpdateInput={this.processInput.bind(this)} />
                <CreateListOfBooks ListOfBooks={this.state.Books} />
            </div>

        )
    }
}

HomePage.contextTypes = {
    router: PropTypes.object.isRequired
};