import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';
import router from 'react-router';
var Router = require('react-router');
var FormData = require('form-data');
import request from 'superagent';
//import {default as UUID} from "node-uuid";

class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: '',
      user: {
          uploadedFile: null,
      //uploadedFileCloudinaryUrl: '',
      fileName:'',
        email: '',
        fname: '',
        lname:'',
        address:'',
        number: null,
        password: '',
        userID:''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {

    
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    const self=this;
    var photo = new FormData();
        
    // create a string for an HTTP body message
    const fname = encodeURIComponent(this.state.user.fname);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const lname = encodeURIComponent(this.state.user.lname);
    const address = encodeURIComponent(this.state.user.address);
    const number = encodeURIComponent(this.state.user.number);
    console.log("fname"+fname)
    
    photo.append('photo', this.state.user.uploadedFile);
    photo.append('firstName', this.state.user.fname);
    photo.append('lastName', this.state.user.lname);
    photo.append('password', this.state.user.password);
    photo.append('address', this.state.user.address);
    photo.append('email', this.state.user.email);
    photo.append('phoneNumber', this.state.user.number);
    photo.append('userID', this.state.user.userID);
    
    // Display the key/value pairs
for (var pair of photo.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
    

    // fetch('http://localhost:3002/users/signup', {
    //   method: 'post',
    //   headers: new Headers({
    //     'Content-Type': 'application/json'
    //   }),
    //   body: JSON.stringify({
    //     firstName:fname,
    //     lastName:lname,
    //     address:address,
    //     phoneNumber:number,
    //     email: email,
    //     password: password,

    //   })
    // })
    if(this.state.user.uploadedFile && this.state.user.fname && this.state.user.lname && this.state.user.password
    && this.state.user.address && this.state.user.email && this.state.user.number && this.state.user.userID){
      request.post('http://localhost:3002/users/signup')
    .send(photo)
      .then((response) => {
        console.log("successfully ran")
        console.log(response)
         return (response);
        // return (response.json());
      }).then(function (message) {
        console.log(message);
        console.log(message.body.success);
        if(message.body.success == false){
          console.log("failed: " + message.body.message);
          self.setState({errors: message.body.message});
          console.log(self.state.errors);
        }
        if(message.body.success== true){
           localStorage.setItem('successMessage', message.body.message);
            Router.browserHistory.push('/login');
        }
       
      })
    }
    else{
       this.setState({errors: "All fields are required!"});
    }
      



  }

  /**
   * function called when file added
   */
   handleChange(event) {

     const self=this;
     const user = self.state.user;
    user['uploadedFile']=event.target.files[0];
    user['fileName']=event.target.files[0].name;
    console.log(this.state.user['uploadedFile']);
    console.log('Selected file:', event.target.files[0]);
}
    

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        onChangeFile={this.handleChange.bind(this)}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;