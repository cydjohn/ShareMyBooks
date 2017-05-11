import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//import TextArea from 'material-ui/TextArea';
import '../styles/authentication.css';
import NumberInput from 'material-ui-number-input';


const EditUser= ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <Card className="container1">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Edit Info</h2>
      {errors && <p className="error-message">{errors}</p>}
      
  <div className="well profile">
    <div className="col-sm-12"> 
       <div className="col-xs-12 col-sm-8">
      <div className="field-line">
        <TextField
          floatingLabelText="First Name"
          name="firstName"
          errorText={errors.firstName}
          onChange={onChange}
          value={user.firstName}
           required={true}
        />
      </div>
       <div className="field-line">
        <TextField
          floatingLabelText="Last Name"
          name="lastName"
          errorText={errors.lastName}
          onChange={onChange}
          value={user.lastName}
           required={true}
        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
           required={true}
        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="address"
          name="address"
          errorText={errors.Location}
          onChange={onChange}
          value={user.address}
           required={true}
        />
      </div>
       <div className="field-line">
        <TextField
          floatingLabelText="Email"
          type="email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
           required={true}
        />
      </div> 
       <div className="field-line">
        <TextField
          floatingLabelText="Phone Number"
         // type="number"
          name="phoneNumber"
          errorText={errors.phoneNumber}
          onChange={onChange}
          value={user.phoneNumber}
           required={true}
           type="number"
        />
      </div>
      

      <div className="button-line">
        <RaisedButton type="submit" label="Update" primary />
      </div>
      </div>
      <div className="col-xs-12 col-sm-4">
      
      </div>
      </div> 
      </div>
    </form>
  </Card>
  
);

EditUser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
 // successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default EditUser;