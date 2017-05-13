import React from "react";

import ViewMessages from "./ViewMessages";
import ViewPrivateMessages from "../containers/ViewPrivateMessages";
const baseUrl = "http://localhost:3002";
import '../styles/ViewMessages.css';


export default class ListOfNewPrivateMessages extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
        
        //this.handleDelete = this.handleDelete.bind(this);
        //console.log("data:");
        //console.log(this.state.data);
    }
 

     handlereadMessage(event){
         
        //event.preventDefault();
        //this.setState({data: this.props.messages});
        console.log("in handle read:");
        console.log(event.toString());
        let messageList = this.props.messages;
        console.log("message list:");
        console.log(messageList);
        //if(messageList.e !== "There are no new messsages to user jdoe"){
        console.log(this.props.messages[event.toString()]);
        console.log(this.props.messages[event.toString()]._id);
        fetch('http://localhost:3002/private_messages/'+ this.props.messages[event.toString()]._id, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then((response) => {
         return (response.json());
      }).then(function (message) {
          console.log("returned response from attempting to read message:")
        console.log(message);
        if(message.messageRead.toString() === "true"){
            //console.log("data:");
            //console.log(this.state.data);
            console.log("new messages list:");
            //console.log(messageList);
            messageList.splice(event.toString(),1);

            console.log("read message removed");
          
            
        }
      })
        //}
        //else{
            //messageList.length = 0;
         
            //messageList.append([noMessages]);
        //}
    }
    

    render() {
       
        return (
            <div className="tableClass">
                
                <table>

                {this.props.messages.map((eachMessage, index) => {
                    //this.state.data = eachRequest;
                    return (
                        <ViewMessages
                            messages={eachMessage}
                            index={index}
                            readMessage={this.handlereadMessage.bind(this, index)}
                       />
                    );
                })}
                </table>
            </div>
        
        );
        
    }
}