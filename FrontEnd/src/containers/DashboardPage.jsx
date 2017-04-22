import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Auth from '../modules/Auth';
var Router = require('react-router');
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '../styles/authentication.css';
//const ReactNative = require('react-native');




export default class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);
  }

   onPressProfile = () => {
       //Add route here
                Router.browserHistory.push('/login');
   };
   onPressViewYourRequest = () => {
       //Add route here
                Router.browserHistory.push('/login');
   };

onPressIncomingRequest= () => {
       //Add route here
                Router.browserHistory.push('/login');
   };
   onPressUpload= () => {
       //Add route here
                Router.browserHistory.push('/login');
   };
   onPressRespond= () => {
       //Add route here
                Router.browserHistory.push('/login');
   };

  render(){
      return(
          
    <div className="button-line">
        <RaisedButton onClick={this.onPressProfile} label="Edit profile" primary />
        <RaisedButton onClick={this.onPressViewYourRequest} label="View Your Requested Books" primary />
        <RaisedButton onClick={this.onPressIncomingRequest} label="Incoming Requests" primary />
        <RaisedButton onClick={this.onPressUpload} label="upload book" primary />
        <RaisedButton onClick={this.onPressRespond} label="Respond to messages" primary />
      </div>
      

      )
  }
}

