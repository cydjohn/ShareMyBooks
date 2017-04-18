import './MessageBoard.css';
import React from 'react';
import { Link, IndexLink } from 'react-router';

const MessageBoard = ({ user }) => (
    <article>
    <ul id="messages"></ul>
	<form action="">
		<select id="room-selector">
			<option value="supportRequest">Support Request</option>
			<option value="general">General</option>
			<option value="other">Other</option>
		</select>
        <label for="userName">User Name:</label>
        <input id="userName" type="text" name="userName" value="{user.userid}" readOnly/>
        <label for="m">Message:</label>
        <input id="m" type="text" name="m" autocomplete="off" />
        <button>Send</button>
	</form>
    </article>
);

export default MessageBoard;