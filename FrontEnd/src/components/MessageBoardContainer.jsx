import React, { Component } from 'react';
import { getUser } from '../../Data/users';
import MessageBoard from './MessageBoard';

class MessageBoardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        };
    }

    setStateFromUser(user) {
        this.setState({ user });
    }

    async componentDidMount() {
        const user = await getUser(this.props.match.params.id);
        this.setStateFromUser(user);
        const nickname = "Phil the Great";
		const socket = io('http://localhost:3002/messageBoard');
		const messages = $("#messages");
		const messageInput = $("#m");
        const userNameInput = $("#userName");
		const theForm = $("form");
		const roomSelector = $("#room-selector");
		let currentRoomId = "";
		console.log("room-selector value: " + roomSelector.val());
		
		socket.on("joined-room", (changes) => {
			currentRoomId = changes.newRoom;
			roomSelector.val(changes.newRoom);
			console.log("messages from db:");
			console.log(changes.dbMessages);
            if(changes.dbMessages.length > 0){
			changes.dbMessages.forEach(function(messageSet) {
				let info = "User " + messageSet.postingUser + " sent the message " + messageSet.messageText;
			messages.append($('<li>').text(info));
				
        	});
			}
		})

		socket.on('request-credentials', () => {
			socket.emit('setup', { nickname: nickname });
		});

		socket.on('receive-message', function (userName, userMessage) {
            console.log("message received to index.html:");
			let info = "User " + userName + " sent the message " + userMessage;
			console.log(info);
			messages.append($('<li>').text(info));
		});

		theForm.submit(function () {
			let message = {
                userName: userNameInput.val(),
				userMessage: messageInput.val(),
				room: currentRoomId
			};
            //sending a 'send message' event to the server/routes/messageBoard.js with info
			socket.emit('send-message', message);
			messageInput.val('');
			return false;
		});

		roomSelector.on("change", () => {
			let newRoom = roomSelector.val();

			if (newRoom === currentRoomId) {
				return;
			}

			messages.empty();
			socket.emit("join-room", {
				newRoom: newRoom,
				previousRoom: currentRoomId
			});
		})

		socket.emit("join-room", {
			newRoom: "general",
			previousRoom: currentRoomId
		});
    }

    async componentWillReceiveProps(nextProps) {
        const user = await getUser(nextProps.match.params.id);
        this.setStateFromUser(user);
        const nickname = "Phil the Great";
		const socket = io('http://localhost:3002/messageBoard');
		const messages = $("#messages");
		const messageInput = $("#m");
        const userNameInput = $("#userName");
		const theForm = $("form");
		const roomSelector = $("#room-selector");
		let currentRoomId = "";
		console.log("room-selector value: " + roomSelector.val());
		
		socket.on("joined-room", (changes) => {
			currentRoomId = changes.newRoom;
			roomSelector.val(changes.newRoom);
			console.log("messages from db:");
			console.log(changes.dbMessages);
            if(changes.dbMessages.length > 0){
			changes.dbMessages.forEach(function(messageSet) {
				let info = "User " + messageSet.postingUser + " sent the message " + messageSet.messageText;
			messages.append($('<li>').text(info));
				
        	});
			}
		})

		socket.on('request-credentials', () => {
			socket.emit('setup', { nickname: nickname });
		});

		socket.on('receive-message', function (userName, userMessage) {
            console.log("message received to index.html:");
			let info = "User " + userName + " sent the message " + userMessage;
			console.log(info);
			messages.append($('<li>').text(info));
		});

		theForm.submit(function () {
			let message = {
                userName: userNameInput.val(),
				userMessage: messageInput.val(),
				room: currentRoomId
			};
            //sending a 'send message' event to the server/routes/messageBoard.js with info
			socket.emit('send-message', message);
			messageInput.val('');
			return false;
		});

		roomSelector.on("change", () => {
			let newRoom = roomSelector.val();

			if (newRoom === currentRoomId) {
				return;
			}

			messages.empty();
			socket.emit("join-room", {
				newRoom: newRoom,
				previousRoom: currentRoomId
			});
		})

		socket.emit("join-room", {
			newRoom: "general",
			previousRoom: currentRoomId
		});
    }

    render() {
        if (this.state.user === undefined) return <div>Loading...</div>;

        return <MessageBoard user={this.state.user} />
    }
}

export default MessageBoardContainer;