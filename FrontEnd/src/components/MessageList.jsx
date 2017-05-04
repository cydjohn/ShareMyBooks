import React, { Component } from 'react';
//import { Link, IndexLink } from 'react-router';
//import '../styles/MessageBoard.css';


const MessageList = ({messages}) =>(//components
    <ul id="messages">
        {messages.map((message)=>(
            <li>{message.user}: {message.text}</li>
        ))}
   </ul>
);

export default MessageList;
// <li>{message.postingUser}: {message.messageText}</li>