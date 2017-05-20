import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//import '../styles/authentication.css';

const styles = {
  floatingLabelStyle: {
    color: "slateblue",
  },
};

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <Card className="container1">
    <form action="/" onSubmit={onSubmit}>
      <h1 className="card-heading">Login</h1>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors && <p className="error-message">{errors}</p>}

      <div className="field-line">
        <TextField
        floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
          required={true}
        />
      </div>

      <div className="field-line">
        <TextField
        floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
          required={true}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Log in" backgroundColor="#006dcc" labelColor="white" />
      </div>

      <CardText>Don't have an account? <Link to={'/signup'} className="account_link">Create one</Link>.</CardText>
    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
