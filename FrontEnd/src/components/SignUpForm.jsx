import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FileInput from 'react-file-input';
import FileReaderInput from 'react-file-reader-input';
//import '../styles/authentication.css';


const styles = {
  floatingLabelStyle: {
    color: "slateblue",
  },
};

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  onChangeFile
}) => (
  <Card className="container1">
    <form action="/" onSubmit={onSubmit}>
      <h1 className="card-heading">Sign Up</h1>

     <p className="error-message">{errors}</p>

      <div className="field-line">
        <TextField
        floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="First Name"
          name="fname"          
          onChange={onChange}
          value={user.fname}
          required={true}
          pattern="[a-zA-Z]+"
          title="Please enter only letters"
          
        />
      </div>

      <div className="field-line">
        <TextField
        floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="Last Name"
          name="lname"          
          onChange={onChange}
          value={user.lname}
           required={true}
           pattern="[a-zA-Z]+"
           title="Please enter only letters"
        />
      </div>

      <div className="field-line">
        <TextField
        floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="Address"
          name="address"        
          onChange={onChange}
          value={user.address}
          required={true}
        />
      </div>

      <div className="field-line">
        <TextField
        floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="Phone Number"
          name="number"
          type="number"         
          onChange={onChange}
          value={user.number}
           required={true}
         
        />
      </div>

      <div className="field-line">
        <TextField
        floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="Email"
          name="email"        
          onChange={onChange}
          value={user.email}
          required={true}
           type="email" 
           minCharacters={11}
        />
      </div>

      <div className="field-line">
        <TextField
        floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}         
          value={user.password}
          required={true}          
           
        />

        <div className="field-line">
        <TextField
        floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelText="UserID"
          name="userID"        
          onChange={onChange}
          value={user.userID}
          required={true}
        />
      </div>

         <div className="FileUpload1">
           <label>
          <FileInput name="myImage"
                  required={true}
                   accept=".png,.gif,.jpeg,.jpg"
                   placeholder="Click Here to Upload An Image"
                   className="inputClass"
                   onChange={onChangeFile} />
                   </label>
        </div>
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create New Account" backgroundColor="#006dcc" labelColor="white" />
      </div>

      <CardText>Already have an account? <Link to={'/login'} className="account_link">Log in</Link></CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onChangeFile:PropTypes.func.isRequired
};

export default SignUpForm;