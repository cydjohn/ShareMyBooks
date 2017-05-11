import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';
import router from 'react-router';
var Router = require('react-router');

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
        email: '',
        fname: '',
        lname:'',
        address:'',
        number: null,
        password: ''
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

    // create a string for an HTTP body message
    const fname = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const lname = encodeURIComponent(this.state.user.lname);
    const address = encodeURIComponent(this.state.user.address);
    const number = encodeURIComponent(this.state.user.number);
    
    fetch('http://localhost:3002/users/signup', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        firstName:fname,
        lastName:lname,
        address:address,
        phoneNumber:number,
        email: email,
        password: password,

      })
    })
      .then((response) => {
         return (response.json());
      }).then(function (message) {
        console.log(message);
        if(message.success==true){
           localStorage.setItem('successMessage', message.message);
            Router.browserHistory.push('/login');
        }else{
          self.setState({errors:message.message});
        }
       
      })

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
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;