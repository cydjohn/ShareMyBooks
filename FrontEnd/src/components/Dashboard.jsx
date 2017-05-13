import React from "react";
import '../styles/Dashboard.css';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
var Router = require('react-router');


export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(index) {
      Router.browserHistory.push(index);
    }
    render() {
        return (
            // Here we will add data received from dashboardPage container, right now we do not have any routes to get user data in back-end
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="well profile">
                            <div className="col-sm-12">
                                <div className="col-xs-12 col-sm-8">
                                   <p><strong>{this.props.user.firstName} {this.props.user.lastName}</strong></p>
                                    <p><strong>{this.props.user.email} </strong> </p>
                                    <p><strong>{this.props.user.address} </strong> </p>
                                    <p><strong>{this.props.user.phoneNumber} </strong> </p>
                                    <p><strong>Current points: {this.props.user.userTotalPoints} </strong> </p>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    {/*add this.props.user.uuid for images*/}
                                    <img src={`../userPageImages/${this.props.user.userID}.png`} alt="user image" className="img-circle img-responsive" />
                                </div>
                            </div>
                        </div>
                        <div >
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "edituser")} label="EDIT INFO" backgroundColor="#006dcc" labelColor="white" />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "uploadbook")} label="UPLOAD A BOOK" backgroundColor="#006dcc" labelColor="white" />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "viewreceivedrequests")} label="VIEW RECEIVED REQUESTS" backgroundColor="#006dcc" labelColor="white" />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "viewsentrequests")} label="VIEW REQUESTS SENT BY ME" backgroundColor="#006dcc" labelColor="white" /><br />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "private_message_to_any_user")} label="SEND A PRIVATE MESSAGE"  backgroundColor="#006dcc" labelColor="white"/>
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "view_private_messages")} label="VIEW ALL PRIVATE MESSAGES" backgroundColor="#006dcc" labelColor="white" />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "messageboard")} label="GO TO MESSAGE BOARD" backgroundColor="#006dcc" labelColor="white" />
                        </div>
                    </div>
                </div>
            </div>
            
        );


    }
}