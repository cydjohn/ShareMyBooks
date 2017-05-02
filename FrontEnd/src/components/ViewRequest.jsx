import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
//import '../styles/viewReceivedRequests.css';

const ViewRequest = ({
  requests
}) => (
            <div className="container">
                <div className="col-sm-12">

                    <div className="bs-calltoaction bs-calltoaction-info">
                        <div className="row">
                            <div className="col-md-6 cta-contents">
                                <h1 className="cta-title">Its a Call To Action</h1>
                                <div className="cta-desc">
                                    <p>Describe the action here.</p>

                                </div>
                            </div>
                            <div className="col-md-6 button-line">
                                <RaisedButton
                                    className="requestButton"
                                    type="submit"
                                    label="Accept"
                                    backgroundColor="#5cb85c"
                                />
                                <RaisedButton
                                    className="requestButton"
                                    type="submit"
                                    label="Reject"
                                    backgroundColor="#d9534f"
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );

ViewRequest.propTypes = {
    requests: PropTypes.object.isRequired
};

export default ViewRequest;

