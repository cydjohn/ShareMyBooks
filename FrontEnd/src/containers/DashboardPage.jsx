import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard';
import EditUser from '../components/EditUser';
//const ReactNative = require('react-native');
const baseUrl = "http://localhost:3002";
var Router = require('react-router');

export default class DashboardPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props, context) {
        super(props, context);
        console.log(props);
        this.state = {
            user: [],
        }
    }

    async componentDidMount() {
        let self = this;
        const userID = localStorage.getItem('userinfo');
        console.log(userID);

        fetch(`${baseUrl}/users/` + userID)
            .then(function (response) {

                return response.json();
            })
            .then((UserData) => {
                console.log(UserData);
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
        if (this.state.user.length === 0)
            return <div>Loading...</div>;
        else {
            return (<Dashboard onSubmit={this.processClick.bind(this)}
                user={this.state.user} />
            
            )
           // return  ( <EditUser user={this.state.user} />)
        }


    }
    
}

DashboardPage.contextTypes = {
    router: PropTypes.object.isRequired
};
