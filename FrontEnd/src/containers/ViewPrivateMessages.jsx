import React, { PropTypes } from 'react';
import ListOfNewPrivateMessages from '../components/ListOfNewPrivateMessages.jsx';
import ListOfAllPrivateMessages from '../components/ListOfAllPrivateMessages.jsx';
import ListOfSentPrivateMessages from '../components/ListOfSentPrivateMesssages.jsx';
import router from 'react-router';
var Router = require('react-router');
const baseUrl = "http://localhost:3002";
import '../styles/ViewMessages.css';

class ViewPrivateMessages extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            sentMessages: [],
            toMessages: [],
            toNewMessages: []
        };
    }

    
    async componentDidMount() {
      let userid = localStorage.getItem("userinfo");
        let self = this;
        fetch(`${baseUrl}/users/${userid}`)
            .then(function (response) {
                //getting userID
                return response.json();
            })
            .then((userInfo) => {
                //getting messages user sent
                fetch('http://localhost:3002/private_messages/from/' + userInfo.userID, {
                    method: 'get',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }).then((response) => {
                        return (response.json());
                    }).then((data) => {
                        console.log("from data:");
                        console.log(data);
                       
                         self.setState({sentMessages: data})
                        
                    });
                
                //getting all user's messages
                fetch('http://localhost:3002/private_messages/to/' + userInfo.userID, {
                    method: 'get',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }).then((response) => {
                        return (response.json());
                    }).then((data) => {
                        
                         self.setState({toMessages: data})
                        
                    });
                
                //getting all user's new messages
                fetch('http://localhost:3002/private_messages/to/new/' + userInfo.userID, {
                    method: 'get',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }).then((response) => {
                        return (response.json());
                    }).then((data) => {
                        
                         self.setState({toNewMessages: data})
                        
                    });
            })
            .catch(function (error) {
                // return error;
                self.setState({ errors: error });
            });    
        }


    /**
     * Render the component.
     */
    render() {
        console.log(this.state.toMessages);
        console.log(this.state.toNewMessages);
        console.log(this.state.sentMessages);
        if (this.state.toMessages.length === 0){            
            return (
            <div class="viewMessages">
                <h3>New Messages:</h3>
                <h4 class="clickOnMessageMessage">Click on a new message to set status to read</h4>
                <ListOfNewPrivateMessages messages={this.state.toNewMessages}/>
                <h3>All Messages:</h3>
                <p class="noPrivateMessages">No Messages For User</p>
                <h3>Sent Messages:</h3>
                <ListOfSentPrivateMessages messages={this.state.sentMessages}/>
                </div>
        );
        }
        
        if (this.state.toNewMessages.length===0){
             
             return (
            <div class="viewMessages">
                <h3>New Messages:</h3>
                <p class="noPrivateMessages">No New Messages for User</p>
                <h3>All Messages:</h3>
                <ListOfAllPrivateMessages messages={this.state.toMessages}/>
                <h3>Sent Messages:</h3>
                <ListOfSentPrivateMessages messages={this.state.sentMessages}/>
                </div>
        );
            }
        if (this.state.sentMessages.length===0){
           
            return (
            <div class="viewMessages">
                <h3>New Messages:</h3>
                <h4 class="clickOnMessageMessage">Click on a new message to set status to read</h4>
                <ListOfNewPrivateMessages messages={this.state.toNewMessages}/>
                <h3>All Messages:</h3>
                <ListOfAllPrivateMessages messages={this.state.toMessages}/>
                <h3>Sent Messages:</h3>
                <p class="noPrivateMessages">No Messages Sent By User</p>
                </div>
        );
        }
        return (
            <div class="viewMessages">
                <h3>New Messages:</h3>
                <h4 class="clickOnMessageMessage">Click on a new message to set status to read</h4>
                <ListOfNewPrivateMessages messages={this.state.toNewMessages}/>
                <h3>All Messages:</h3>
                <ListOfAllPrivateMessages messages={this.state.toMessages}/>
                <h3>Sent Messages:</h3>
                <ListOfSentPrivateMessages messages={this.state.sentMessages}/>
                </div>
        );
    }

}

ViewPrivateMessages.contextTypes = {
    router: PropTypes.object.isRequired
};

export default ViewPrivateMessages;