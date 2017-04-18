import React from 'react';
// import { Card, CardTitle } from 'material-ui/Card';
import CreateListOfBooks from "./CreateListOfBooks.jsx";
import Search from "./Search.jsx";
import { getBooks } from "../data/books";
const baseUrl = "http://localhost:3002";


export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Books: [],

        };
    }

    async componentDidMount() {
          let self = this;
           fetch(`${baseUrl}/books`)
        .then(function (response) {
            return response.json();
        })
        .then((BookList)=>{
            self.setState({Books: BookList})
        })
        .catch(function (error) {
            return error;
        });
    }

    render() {
        if (this.state.Books.length === 0)
            return <div>Loading...</div>;
        return (
            <div className="container">
                <Search />
                <CreateListOfBooks ListOfBooks={this.state.Books} />
            </div>

        )
    }
}
