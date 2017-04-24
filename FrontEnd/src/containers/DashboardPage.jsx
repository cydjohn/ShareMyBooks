import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard';
//const ReactNative = require('react-native');
const baseUrl = "http://localhost:3002";

export default class DashboardPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: [],
        }
    }

    async componentDidMount() {
        let self = this;
        const userID = localStorage.getItem('user');

        fetch(`${baseUrl}/users/` + userID)
            .then(function (response) {
                return response.json();
            })
            .then((UserData) => {
                self.setState({ user: UserData })
            })
            .catch(function (error) {
                return error;
            });
    }

    processClick(event) {
        event.preventDefault();
        console.log(event.target.value)

    }
    render() {
        // if (this.state.user.length === 0)
        //     return <div>Loading...</div>;
        // return <Dashboard UserData={this.state.user} />
        return <Dashboard
            onSubmit={this.processClick.bind(this)} />

    }
}

DashboardPage.contextTypes = {
    router: PropTypes.object.isRequired
};