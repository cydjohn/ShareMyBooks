import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
var Router = require('react-router');
//import ViewRequest from "./ViewRequest";
const baseUrl = "http://localhost:3002"


export default class ListOfReceivedRequest extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);

        this.state = {
            data: [],
            accepte: false,
            notaccepte: true,
            rejected: ''
        }
    }

    handleAccept(index) {
        //event.preventDefault();

        let self = this;
        let userid = localStorage.getItem("userinfo");
        console.log("accept");
        console.log(index);
        fetch('http://localhost:3002/userRequests/acceptUserRequest/' + index, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then((response) => {

                return (response.json());
            }).then((data) => {
                if (data.success == true) {
                    console.log(data.message);

                    window.location.reload();
                }
                else {
                    self.setState({ accepted: false })
                }
            })


    }

    handleReject(index) {
        //event.preventDefault();

        let self = this;
        let userid = localStorage.getItem("userinfo");
        console.log("Reject");
        console.log(index);
        fetch('http://localhost:3002/userRequests/rejectUserRequest/' + index, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then((response) => {

                return (response.json());
            }).then((data) => {
                if (data.success == true) {
                    console.log(data.message);

                    window.location.reload();
                }
                else {
                    self.setState({ accepted: false })
                }
            })


    }


    render() {


        return (
            <div className="AllBooks">

                <h1> Received Requests: </h1>


                {this.props.requests.map((eachRequest) => {

                    this.state.data = eachRequest;
                    console.log("In render");
                    console.log(this.state.data);
                    if (eachRequest.requestResult.status == -1) {
                        return (
                            <div className="container">
                                <div className="col-sm-12">
                                    <div className="bs-calltoaction bs-calltoaction-info">
                                        <div className="row">
                                            <div className="col-md-6 cta-contents">
                                                <h2 className="cta-title">Requested Book: {eachRequest.bookName}</h2>
                                                <div className="cta-desc">
                                                    
                                                    <p>Requested by: {eachRequest.requestResult.requestFrom}</p>
                                                    <p> Request Number: {eachRequest.requestResult._id} </p>
                                                </div>
                                            </div>

                                            <div className="col-md-6 button-line">
                                                <div className="action">

                                                    <RaisedButton
                                                        className="requestButton"
                                                        type="submit"
                                                        label="Accept"
                                                        backgroundColor="#5cb85c"
                                                        ID={eachRequest.requestResult._id}
                                                        onClick={this.handleAccept.bind(this, eachRequest.requestResult._id)}
                                                    />
                                                    <RaisedButton
                                                        className="requestButton"
                                                        type="submit"
                                                        label="Reject"
                                                        backgroundColor="#d9534f"
                                                        onClick={this.handleReject.bind(this, eachRequest.requestResult._id)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    else {
                        if (eachRequest.requestResult.status == 1) {
                            return (
                                <div className="container">
                                    <div className="col-sm-12">
                                        <div className="bs-calltoaction bs-calltoaction-info">
                                            <div className="row">
                                                <div className="col-md-6 cta-contents">
                                                    <h2 className="cta-title">Requested Book: {eachRequest.bookName}</h2>
                                                    <div className="cta-desc">
                                                        <p>Requested by: {eachRequest.requestResult.requestFrom}</p>
                                                        <p> Request Number: {eachRequest.requestResult._id} </p>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 button-line">
                                                    <div className="action">

                                                        <RaisedButton className="primary"
                                                            label="Accepted"
                                                            disabled={true}
                                                            disabledBackgroundColor="white"
                                                            disabledLabelColor="black" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        else {
                            return (
                                <div className="container">
                                    <div className="col-sm-12">
                                        <div className="bs-calltoaction bs-calltoaction-info">
                                            <div className="row">
                                                <div className="col-md-6 cta-contents">
                                                    <h2 className="cta-title">Requested Book: {eachRequest.bookName}</h2>
                                                    <div className="cta-desc">
                                                        <p>Requested by: {eachRequest.requestResult.requestFrom}</p>
                                                        <p> Request Number: {eachRequest.requestResult._id} </p>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 button-line">
                                                    <div className="action">

                                                        <RaisedButton className="primary"
                                                            label="Rejected"
                                                            disabled={true}
                                                            disabledBackgroundColor="white"
                                                            disabledLabelColor="black" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    }
                }
                )}
            </div>
        )
    }
}