import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//import '../styles/authentication.css';



const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Card className="container1">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors && <p className="error-message">{errors}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="First Name"
          name="fname"
          errorText={errors}
          onChange={onChange}
          value={user.fname}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Last Name"
          name="lname"
          errorText={errors}
          onChange={onChange}
          value={user.lname}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Address"
          name="address"
          errorText={errors}
          onChange={onChange}
          value={user.address}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Phone Number"
          name="number"
          type="number"
          errorText={errors}
          onChange={onChange}
          value={user.number}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create New Account" primary />
      </div>

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;