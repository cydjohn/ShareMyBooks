import React, { PropTypes } from 'react';
import ListOfSentRequest from '../components/ListOfSentRequest.jsx';
const baseUrl = "http://localhost:3002";

class ViewSentRequest extends React.Component {

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
                fetch('http://localhost:3002/userRequests/viewRequestByFromUserId/' + userInfo.userID, {
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
            return <h1>No Requests Sent By You</h1>;
        return (
                <ListOfSentRequest requests={this.state.requests}
                />

        );
    }

}

ViewSentRequest.contextTypes = {
    router: PropTypes.object.isRequired
};

export default ViewSentRequest;