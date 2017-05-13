import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
//import '../styles/authentication.css';
const baseUrl = "http://localhost:3002";

const styles = {
  floatingLabelStyle: {
    color: "slateblue",
  },
};

class PrivateMessageToAnyUserForm extends React.Component {

  
   // Class constructor.
   
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
     //toUser: 'hi',
     userList:[],
     submissionError: ''
    };
    

    this.handleToUserChange = this.handleToUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  async componentDidMount() {
        let self = this;
        fetch(`${baseUrl}/users`)
            .then(function (response) {
                return response.json();
            })
            .then((userlist) => {
                console.log(userlist);
                //self.setState({ userList: userlist });
                userlist.forEach(function(user) {
                console.log("a user:");
                console.log(user);
			self.state.userList.push(user.userID);
				console.log("list of user ids: ");
                console.log(self.state.userList);
        	});
            })
            .catch(function (error) {
                return error;
            });
    }

 /*async componentDidMount() {
     let self=this;
      fetch(`${baseUrl}/users`)
        .then(function (response) {
            console.log(response.json());
            return response.json();
        })
        .then((userInfo)=>{
            console.log("user info:");
            console.log(userInfo);
            userInfo.forEach(function(user) {
                console.log("a user:");
                console.log(user);
			self.state.userList.push(user.userID);
				
        	});

        })
        .catch(function (error) {
           // return error;
            self.setState({errors:error});
        });
    }
    */

handleMessageChange(event){
   //event.target.value is room
   console.log("updating message text input:");
   console.log(event.target.value);
    this.props.onUpdateInput(event.target.value);
    //this.setState({ messageText : event.target.value });
}
//handleChange = (event, index, value) => this.setState({value});
handleToUserChange(event,index,value){
   //event.target.value is room
   console.log("changing user dropdown:");
   console.log(value);

    this.props.onToUserChange(value);
    this.setState({ toUser : value });
}
handleSubmit(event){
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    console.log("event:");
    console.log(event.target.value);
    if(this.props.toUser && this.props.fromUser && this.props.message){
      this.setState({ submissionError : "" });
		var message = {
			to : this.props.toUser,
			from : this.props.fromUser,
            message: this.props.message
		}
		this.props.onMessageSubmit(message);
    }
    else{
      this.setState({ submissionError : "All fields are required!" });
    }
			//this.setState({ messageText : '' });
}
  
   // Render the component.
   
  render() {
    return(
         <Card className="container1">
    <form action="/" onSubmit={this.handleSubmit}>
      <h1 className="card-heading">Send A Private Message to a User</h1>
      {this.state.submissionError && <p className="error-message">{this.state.submissionError}</p>}
{this.props.errors && <p className="error-message">{this.props.errors}</p>}
{this.props.sucess && <p className="success-message">{this.props.sucess}</p>}
      <div className="field-line">
        <TextField
        floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="From:"
          name="fromUser"
          value={this.props.fromUser}
          disabled={true}
        />
      </div>

      <div className="field-line">
        <label>
<SelectField
    floatingLabelStyle={{ color: 'slateblue' }}
          floatingLabelText="Select a User To Send Message To:"
          name="toUser"
          value={this.props.toUser}
          onChange={this.handleToUserChange}
        >
          {this.state.userList.map((userid, index) =>
            <MenuItem key={index} value={userid} primaryText={userid} />
          )}
        </SelectField>
</label>
      </div>

      <div className="field-line">
        <TextField
        floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="Message to Send"
          name="message"
          onChange={this.handleMessageChange}
          value={this.props.message}
          multiLine={true}
          rows={5}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="SEND MESSAGE" backgroundColor="#006dcc" labelColor="white" />
      </div>

    </form>
  </Card>
		);
  }

}

PrivateMessageToAnyUserForm.propTypes = {

  toUser: PropTypes.object.isRequired,

  fromUser: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};

export default PrivateMessageToAnyUserForm;
  //onSubmit: PropTypes.func.isRequired,
  //onChange: PropTypes.func.isRequired,
  //errors: PropTypes.object.isRequired,
    //userList: PropTypes.object.isRequired,

