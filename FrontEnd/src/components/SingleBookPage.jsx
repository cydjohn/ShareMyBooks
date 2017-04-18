import React from 'react';
import SingleBook from './SingleBook';

export default class SinlgeBookPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: [],
        };
    }


    componentDidMount() {

        let self = this;
        console.log(this.props.params.id)
        fetch('http://localhost:3002/books/' + this.props.params.id)
            .then(function (response) {
                return response.json();
            })
            .then(function (EachBook) {
                //console.log(userLists)
                self.setState({ book: EachBook })

            })
            .catch(function (error) {
                console.log('Request failed', error)
            });
    }


    render() {

        if (this.state.book.length === 0) return <div>Loading...</div>;
        return <SingleBook book={this.state.book} />

    }
}