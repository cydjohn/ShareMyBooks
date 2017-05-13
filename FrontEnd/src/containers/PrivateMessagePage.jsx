import React, { PropTypes } from 'react';
import PrivateMessageForm from '../components/PrivateMessageForm.jsx';
//import router from 'react-router';
var Router = require('react-router');
const baseUrl = "http://localhost:3002";

class PrivateMessagePage extends React.Component {
constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: '',
      message: '',
      user: '',
      bookUploader:''
    };

    this.processForm = this.processForm.bind(this);
    this.processMessageTextInput = this.processMessageTextInput.bind(this);
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
            self.setState({user: userInfo.userID})
        })
        .catch(function (error) {
           // return error;
            self.setState({errors:error});
        });

        //set user who uploaded book 
        console.log("the books props:");
        console.log(this.props.params.bookUploadedBy);
        self.setState({bookUploader:this.props.params.bookUploadedBy});

  }

   processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    const self=this;

    // create a string for an HTTP body message
    const fromUserId = encodeURIComponent(this.state.user);
    const toUserId = encodeURIComponent(this.state.bookUploader);
    const messageText = this.state.message;
    //const formData = `fromUserId=${fromUserId}&toUserId=${toUserId}&messageText=${messageText}`;
if(this.state.user && this.state.bookUploader && this.state.message){

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
            Router.browserHistory.push('/');//redirect to home page
        }else{
          self.setState({errors:"error sending message"});
        }
       
      })
   }
   else{
     self.setState({errors:"All fields are required!" });
   }
  }

  processMessageTextInput(event) {
    console.log("processing input: " + event.target.value);
        this.setState({ message: event.target.value });
    }

  render() {
    return (
      <PrivateMessageForm
        onSubmit={this.processForm}
        onChange={this.processMessageTextInput}
        user={this.state.user}
        bookUploader={this.state.bookUploader}
        message={this.state.message}
        errors={this.state.errors}
      />
    );
  }

}


export default PrivateMessagePage;
