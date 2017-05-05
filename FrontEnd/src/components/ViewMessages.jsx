import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
//import '../styles/viewReceivedRequests.css';
import '../styles/ViewMessages.css';

const ViewMessages = ({
  messages,
  index,
  readMessage
}) => (
        <div>

{/*<tr>
  <td>{messages.fromUserId}</td>
  <td>{messages.toUserId}</td>
  <td> {messages.messageText} </td>
  <td> {messages.messageRead.toString()} </td> 
  <td>  {messages.time} </td>
  </tr>
*/}
                           <tr key={index} data-item={messages} onClick={readMessage}>
                                <th>From:</th>
                            <td>{messages.fromUserId}</td>
                             
                                 <th>To:</th>
                                <td>{messages.toUserId}</td>
                                
                                <th>Message:</th>
                                <td> {messages.messageText} </td>
                                
                                <th>Read Yet:</th>
                                <td>{messages.messageRead.toString()} </td> 
                                
                                <th>Time Sent:</th>
                                <td>{messages.time.toString()} </td>
                                </tr>
                            
                       </div>


    );

ViewMessages.propTypes = {
    messages: PropTypes.object.isRequired,
};

export default ViewMessages;