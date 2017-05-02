import React from 'react';
var Router = require('react-router');
import RaisedButton from 'material-ui/RaisedButton';
import io from 'socket.io-client';
let socket = io('http://localhost:3002/messageBoard');
const baseUrl = "http://localhost:3002";
import MessageList from '../components/MessageList.jsx';
import MessageForm from './MessageForm.jsx';


class MessageBoard extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      messages: [],
      user: '',
      room: 'general',
      messageText: '',
    }; 

this.userJoinedRoom = this.userJoinedRoom.bind(this);
    this.messageReceived = this.messageReceived.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleChangeRoom = this.handleChangeRoom.bind(this);
    this.processInput = this.processInput.bind(this);
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
            return error;
        });

         socket.emit("join-room", {
			newRoom: this.state.room
		});

        //get all messages from DB for a chosen room
        socket.on('joined-room', this.userJoinedRoom);
        //send message to be added to DB
        socket.on('receive-message', this.messageReceived);
  }

    userJoinedRoom(changes) {//works!
            let self = this;
            self.state.messages.length = 0;//clear existing messages when you change rooms
			console.log("messages from db:");
			console.log(changes.dbMessages);
            if(changes.dbMessages.length > 0){
			changes.dbMessages.forEach(function(messageSet) {
                console.log(messageSet);
			self.state.messages.push({
                user: messageSet.postingUser,
                text: messageSet.messageText});
				
        	});
        }
		self.setState({currentRoomId: changes.newRoom, messages: self.state.messages});
	}

    messageReceived(userName, userMessage) {
        console.log("username: " + userName);
        console.log("userMessage: " + userMessage);
         let self = this;
        self.state.messages.push({
                user: userName,
                text: userMessage
            });
			
            self.setState({messages: self.state.messages});
    }

handleMessageSubmit(event){
    //event.preventDefault();
    console.log(event);
    console.log("message to submit: " + this.state.messageText);
    console.log("room to submit to: " + event.room);
    console.log("user who submitted: " + event.user);
    // let self = this;
        //self.state.messages.push({
         //       user: this.state.user,
         //       text: this.state.messageText
          //  });
			
          //  self.setState({messages: self.state.messages});
   //let self = this;
   // var {messages} = self.state;
		//messages.push(message);
		//self.setState({messages});
        //sending a 'send message' event to the server/routes/messageBoard.js with info
        let message = {
                userName: this.state.user,
				userMessage: this.state.messageText,
				room: this.state.room
			};
		socket.emit('send-message', message);
}

handleChangeRoom(room){
    let self = this;
    console.log(room);
     socket.emit("join-room", {
				newRoom: room
			});
    self.setState({room: room});
}

processInput(event) {
    console.log("processing input: " + event);
        this.setState({ messageText: event });
    }
    
handleClick(index) {
        Router.browserHistory.push(index);
    }
  /**
   * Render the component.
   */
  render() {
		return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="well profile">
                            
			<div>
				<MessageList
					messages={this.state.messages}
				/>
                <div id="formAndButton">
				<MessageForm
					onMessageSubmit={this.handleMessageSubmit}
					user={this.state.user}
                    room={this.state.room}
                    messageText={this.state.messageText}
                    onChangeRoom={this.handleChangeRoom}
                    onUpdateInput={this.processInput} />
				
			</div>
            </div>
            </div>
            </div>
            </div>
            </div>
            
		);
	}

}

export default MessageBoard;