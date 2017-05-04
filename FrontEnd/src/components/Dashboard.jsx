import React from "react";
//import '../styles/Dashboard.css';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
var Router = require('react-router');
//import EditUser from 
/*const Dashboard = ({
  onSubmit,
  user
}) => (

<div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="well profile">
                            <div className="col-sm-12">
                                <div className="col-xs-12 col-sm-8">
                                    <h2>{user.firstName}</h2>
                                    <p><strong>{user.email} </strong> </p>
                                    <p><strong>Hobbies: </strong> Read, out with friends, listen to music, draw and learn new things. </p>
                                    <p><strong>Skills: </strong>
                                        <span className="tags">html5</span>
                                        <span className="tags">css3</span>
                                        <span className="tags">jquery</span>
                                        <span className="tags">bootstrap3</span>
                                    </p>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    {/*add this.props.user.uuid for images*/
                                // <img src={"../bookPageImages/464d4339-826c-4744-94ce-ec07efa134c3.png"} alt="" className="img-circle img-responsive" />
                                /* </div>
                            </div>
                        </div>
                        <div >
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "edituser")} label="EDIT INFO" primary />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "uploadbook")} label="UPLOAD A BOOK" primary /><br />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "viewreceivedrequests")} label="VIEW RECEIVED REQUESTS" primary />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "viewsentrequests")} label="VIEW REQUESTS SENT BY ME" primary />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "conncet")} label="CONNECT TO PEOPLE" primary />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "messageboard")} label="GO TO MESSAGE BOARD" primary />
                        </div>
                    </div>
                </div>
            </div>


)

Dashboard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Dashboard;*/

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
                                    <h2>{this.props.user.firstName} {this.props.user.lastName}</h2>
                                    <p><strong>{this.props.user.email} </strong> </p>
                                    <p><strong>{this.props.user.address} </strong> </p>
                                    <p><strong>{this.props.user.phoneNumber} </strong> </p>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    {/*add this.props.user.uuid for images*/}
                                    <img src={"../bookPageImages/464d4339-826c-4744-94ce-ec07efa134c3.png"} alt="" className="img-circle img-responsive" />
                                </div>
                            </div>
                        </div>
                        <div >
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "edituser")} label="EDIT INFO" primary />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "uploadbook")} label="UPLOAD A BOOK" primary /><br />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "viewreceivedrequests")} label="VIEW RECEIVED REQUESTS" primary />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "viewsentrequests")} label="VIEW REQUESTS SENT BY ME" primary />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "private_message_to_any_user")} label="SEND A PRIVATE MESSAGE" primary />
                            <RaisedButton className="userActions" type="submit" onClick={this.handleClick.bind(this, "messageboard")} label="GO TO MESSAGE BOARD" primary />
                        </div>
                    </div>
                </div>
            </div>
            
        );


    }
}