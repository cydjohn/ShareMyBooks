import React, { PropTypes } from 'react';
import ListOfReceivedRequest from '../components/ListOfReceivedRequest.jsx';
import router from 'react-router';
var Router = require('react-router');
const baseUrl = "http://localhost:3002";

class viewReceivedRequests extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            requests: []
        };
    }

    async componentDidMount() {
        let self = this;
        let userID = localStorage.getItem('userinfo');
        fetch(`${baseUrl}/userRequests/viewRequestByFromUserId/` + userID)
            .then(function (response) {
                return response.json();
            })
            .then((receivedRequests) => {
                self.setState({ requests: receivedRequests })
            })
            .catch(function (error) {
                return error;
            });
    }


    /**
     * Render the component.
     */
    render() {
        if (this.state.requests.length === 0)
            return <div>Loading...</div>;
        return (
                <ListOfReceivedRequest requests={this.state.requests}
                />

        );
    }

}

viewReceivedRequests.contextTypes = {
    router: PropTypes.object.isRequired
};

export default viewReceivedRequests;
