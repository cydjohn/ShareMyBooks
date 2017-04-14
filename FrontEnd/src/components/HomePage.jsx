import React from 'react';
// import { Card, CardTitle } from 'material-ui/Card';
import CreateListOfBooks from "./CreateListOfBooks.jsx";
import Search from "./Search.jsx";


export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Books: [],

        };
    }

    componentDidMount() {
        let self = this;

        fetch('http://localhost:3002')
            .then(function (response) {
                return response.json();
            })
            .then(function (BooksList) {
                //console.log(userLists)
                self.setState({ Books: BooksList })

            })
            .catch(function (error) {
                console.log('Request failed', error)
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
