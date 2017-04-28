import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//import '../styles/authentication.css';
import '../styles/Base.css';



const PrivateMessageForm = ({
  onSubmit,
  onChange,
  user,
  bookUploader,
  message,
  errors
}) => (
  <Card className="container1">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Send A Private Message to a User Who Uploaded This Book</h2>
{errors && <p className="error-message">{errors}</p>}
      <div className="field-line">
        <TextField
          floatingLabelText="From:"
          name="fromUser"
          value={user}
          disabled={true}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="To:"
          name="toUser"
          value={bookUploader}
          disabled={true}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Message to Send"
          name="message"
          onChange={onChange}
          value={message}
          multiLine={true}
          rows={5}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="SEND MESSAGE" primary />
      </div>

    </form>
  </Card>
);

PrivateMessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  bookUploader: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};

export default PrivateMessageForm;

