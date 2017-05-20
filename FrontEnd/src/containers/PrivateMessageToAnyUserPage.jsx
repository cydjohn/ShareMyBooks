import React, { PropTypes } from 'react';
import PrivateMessageToAnyUserForm from '../components/PrivateMessageToAnyUserForm.jsx';
//import router from 'react-router';
var Router = require('react-router');
const baseUrl = "http://localhost:3002";

class PrivateMessageToAnyUserPage extends React.Component {
constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: '',
      message: '',
      fromUser: '',
      toUser:'',
      sucess: ''
    };

    this.processForm = this.processForm.bind(this);
    this.processInput = this.processInput.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }
   async componentDidMount() {
      
      //get current user
      //get user id from local storage
      //let userid = '63423b56-d42e-4bcf-a043-9cbad05f065c';//for testing purposes
      let userid = localStorage.getItem("userinfo");
      let self = this;
    fetch(`${baseUrl}/users/${userid}`)
        .then(function (response) {
            return response.json();
        })
        .then((userInfo)=>{
            self.setState({fromUser: userInfo.userID})
        })
        .catch(function (error) {
           // return error;
            self.setState({errors:error});
        });

  }


   processForm(event) {
    // prevent default action. in this case, action is the form submission event
    //event.preventDefault();
    const self=this;
    console.log("start of processing form:");
    console.log("from user: " + this.state.fromUser);
    console.log("to user: " +  this.state.toUser);
    console.log("message: " + this.state.message);

    // create a string for an HTTP body message
    const fromUserId = encodeURIComponent(this.state.fromUser);
    const toUserId = encodeURIComponent(this.state.toUser);
    const messageText = this.state.message;
    //const formData = `fromUserId=${fromUserId}&toUserId=${toUserId}&messageText=${messageText}`;
if(this.state.fromUser && this.state.toUser && this.state.message){
    fetch('http://localhost:3002/private_messages/', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        fromUserId:fromUserId,
        toUserId: toUserId,
        messageText: messageText
      })
    })
      .then((response) => {
         return (response.json());
      }).then(function (message) {
          console.log("returned response from attempting to add message to db:")
        console.log(message);
        if(message){
            self.setState({sucess:"Successfully sent message!",message: ''});
        }else{
          self.setState({errors:"error sending message"});
        }
       
      })
}
else{
  self.setState({errors:"All fields are required!" });
}
  }


  processInput(message) {
    console.log("message : " + message);
    this.setState({ message: message });
}

    handleUserChange(user){
    let self = this;
    console.log(user);
    self.setState({toUser: user});
}

  render() {
    return (
      <PrivateMessageToAnyUserForm
        onMessageSubmit={this.processForm}
        onUpdateInput={this.processInput}
        toUser={this.state.toUser}
        fromUser={this.state.fromUser}
        userList={this.state.userList}
        message={this.state.message}
        errors={this.state.errors}
        sucess={this.state.sucess}
        onToUserChange={this.handleUserChange}
      />
    );
  }

}


export default PrivateMessageToAnyUserPage;
