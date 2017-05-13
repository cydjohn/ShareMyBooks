import React, { PropTypes } from 'react';
//import router from 'react-router';
var Router = require('react-router');
//import '../styles/MessageBoard.css';
const baseUrl = "http://localhost:3002";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class MessageForm extends React.Component {

  
   // Class constructor.
   
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
     messageText: ''
    };
    

    this.roomChangeHandler = this.roomChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

 // async componentDidMount() {
  //  }

handleUpdateInput(event){
   //event.target.value is room
   console.log("updating message text input:");
   console.log(event.target.value);
    this.props.onUpdateInput(event.target.value);
    this.setState({ messageText : event.target.value });
}
roomChangeHandler(event){
   //event.target.value is room
    this.props.onChangeRoom(event.target.value);
    this.setState({ room : event.target.value });
}
handleSubmit(event){
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    console.log("event:");
    console.log(event.target.value);
		var message = {
			user : this.props.user,
			text : this.props.messageText,
            room: this.props.room
		}
		this.props.onMessageSubmit(message);

			//this.setState({ messageText : '' });
}
  
   // Render the component.
   
  render() {
    return(
        <form onSubmit={this.handleSubmit}>
            <label for="room-selector">Select a Room:</label>
		<select id="room-selector" onChange={this.roomChangeHandler} value={this.props.room}>
			<option value="supportRequest">Support Request</option>
			<option value="general">General</option>
			<option value="other">Other</option>
		</select>
        <label htmlFor="userName">User Name:</label>
        <input value={this.props.user} id="userName" type="text" name="userName" readOnly/>
        <label htmlFor="m">Message:</label>
        <input value={this.state.messageText} id="m" type="text" name="messageText" autocomplete="off" required onChange={this.handleUpdateInput}/>
        <br/>
        <br/>
        <br/>
        <button>SEND POST</button>
        
	</form>
		);
  }

}

/*
const MessageForm = ({
  onMessageSubmit,user,room,messageText,onChangeRoom,onUpdateInput
}) => (
<form onSubmit={onMessageSubmit}>
		<select id="room-selector" onChange={onChangeRoom} value={room}>
			<option value="supportRequest">Support Request</option>
			<option value="general">General</option>
			<option value="other">Other</option>
		</select>
        <label for="userName">User Name:</label>
        <input value={user} id="userName" type="text" name="userName" readOnly/>
        <label for="messageText">Message:</label>
        <input type="text" name="messageText" autocomplete="off" onUpdateInput={onUpdateInput} />
        <button>Send</button>
	</form>
);
*/

export default MessageForm;