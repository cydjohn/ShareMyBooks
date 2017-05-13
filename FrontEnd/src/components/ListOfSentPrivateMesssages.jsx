import React from "react";

import ViewMessages from "./ViewMessages";
import '../styles/ViewMessages.css';


export default class ListOfSentPrivateMessages extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }
     handlereadMessage(event){
        //event.preventDefault();
        console.log("in handle read:");
        console.log(event.toString());
        //console.log(event.currentTarget.getAttribute('messages'));
        //console.log(event.target.getAttribute('messages'));

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