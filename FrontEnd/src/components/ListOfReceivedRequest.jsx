import React from "react";

import ViewRequest from "./ViewRequest";


export default class ListOfReceivedRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }

    handleAccept(event){
        event.preventDefault();
        console.log(event.target.name);
    }

    render() {
        return (
            <div className="AllBooks">
                                <h2> Received Requests: </h2>

                {this.props.requests.map((eachRequest) => {
                    this.state.data = eachRequest;
                    return (
                        <ViewRequest
                            requests={eachRequest}
                            accept={this.handleAccept.bind(this)}
                       />
                    );
                })}
            </div>
        );
    }
}