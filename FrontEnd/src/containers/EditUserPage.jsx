import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../modules/Auth';
import EditUser from '../components/EditUser.jsx';
var Router = require('react-router');
import fetch from 'isomorphic-fetch';
const baseUrl = "http://localhost:3002";

class EditUserpage extends React.Component {

  
  constructor(props, context) {
    super(props, context);
    

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: '',
      user: {
        email: '',
        fname: '',
        lastName:'',
        address:'',
        password: '',
        phoneNumber:''

      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);

  }
 
 async componentDidMount() {
        let self = this;
        const userID = localStorage.getItem('userinfo');
        console.log(userID);

        fetch(`${baseUrl}/users/` + userID)
            .then(function (response) {

                return response.json();
            })
            .then((UserData) => {
                console.log(UserData);
                console.log("USER EDIT INFO DATA")
                self.setState({ user: UserData });
                console.log("last name:");
            
             console.log("this.state.user.lastName: "+ this.state.user.lastName);
             
                
            })
            .catch(function (error) {
                return error;
            });

            
    }
  
  processForm(event) {
    event.preventDefault();
    const self=this;
    const userId = localStorage.getItem('userinfo');
    console.log("Im in edit");
    console.log(userId);
    const fname = this.state.user.firstName;
    const lname = this.state.user.lastName;
    const email = this.state.user.email;
    const address=this.state.user.address;
    const num=(this.state.user.phoneNumber);
    const password = this.state.user.password;

    console.log(fname);
    console.log(lname);
     console.log(email);
     console.log(address);
     console.log(num);
     console.log(password);
      
    //const password = encodeURIComponent(this.state.user.password);

    //const formData = `name=${name}&email=${email}`;//&password=${password}


    fetch('http://localhost:3002/users/'+userId, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        firstName:fname,
        lastName:lname,
        address:address,
        email: email,
        phoneNumber:num,
        password: password

       // password: password
      })
    })
      .then((response) => {
        console.log(response.url)
        return (response.json());
      }).then(function (message) {
        console.log(message.success);
        if (message.success == true) {
          localStorage.setItem('successMessage', message.message);
          //localStorage.setItem('userinfo', message.user);

         // Auth.authenticateUser(message.token);
          
          Router.browserHistory.push('/user');
          
      }
         else {
          self.setState({ errors: message.message });
        }

      })

  }


  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object*/
   
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  
   /* Render the component.*/
   
  render() {
    return (
      <EditUser
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
      //  successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}

EditUserpage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default EditUserpage;