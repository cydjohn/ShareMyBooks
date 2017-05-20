import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/viewReceivedRequests.css';

const ViewSentRequest = ({
  requests,
    accept
}) => (
        <div className="container">
            <div className="col-sm-12">
                <div className="bs-calltoaction bs-calltoaction-info">
                    <div className="row">
                        <div className="col-md-6 cta-contents">
                            <h2 className="cta-title">Requested book: {requests.bookName}</h2>
                            <div className="cta-desc">
                                <p>Requested by: {requests.requestResult.requestFrom}</p>
                                <p> Request Number: {requests.requestResult._id} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

ViewSentRequest.propTypes = {
    requests: PropTypes.object.isRequired,
    accept: PropTypes.func.isRequired
};

export default ViewSentRequest;