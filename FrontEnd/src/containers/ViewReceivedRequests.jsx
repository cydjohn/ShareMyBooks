import React, { PropTypes } from 'react';
import ListOfReceivedRequest from '../components/ListOfReceivedRequest.jsx';
import router from 'react-router';
var Router = require('react-router');
const baseUrl = "http://localhost:3002";

class ViewReceivedRequests extends React.Component {

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
      let userid = localStorage.getItem("userinfo");
        let self = this;
        fetch(`${baseUrl}/users/${userid}`)
            .then(function (response) {
                return response.json();
            })
            .then((userInfo) => {
                fetch('http://localhost:3002/userRequests/viewRequestByToUserId/' + userInfo.userID, {
                    method: 'get',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                    .then((response) => {
                        return (response.json());
                    }).then((data) => {
                        if (data.success == true) {
                         self.setState({requests: data.message})
                        }
                    })
            })
            .catch(function (error) {
                // return error;
                self.setState({ errors: error });
            });    }


    /**
     * Render the component.
     */
    render() {
        if (this.state.requests.length === 0)
            return <div>No Requests Sent To You</div>;
        return (
                <ListOfReceivedRequest requests={this.state.requests}
                />

        );
    }

}

ViewReceivedRequests.contextTypes = {
    router: PropTypes.object.isRequired
};

export default ViewReceivedRequests;