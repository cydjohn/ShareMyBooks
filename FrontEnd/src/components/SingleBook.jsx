import React from 'react';
import Img from 'react-image'
import VisibilitySensor from 'react-visibility-sensor'
import RaisedButton from 'material-ui/RaisedButton';
import ReactModal from 'react-modal';
import '../styles/Singlebook.css';
const baseUrl = "http://localhost:3002";



export default class Singlebook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            requestSuccess: false,
            notRequested: true,
            showModal: false,
            login: true,
            errors:''
        }

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }
    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            login: true
        });
    }

    handleRequest() {
        let userid = localStorage.getItem("userinfo");
        if (!userid) {
            this.setState({
                login: false,
                showModal: true
            });
        }
        else {
            let self = this;
            fetch(`${baseUrl}/users/${userid}`)
                .then(function (response) {
                    return response.json();
                })
                .then((userInfo) => {
                    fetch('http://localhost:3002/userRequests', {
                        method: 'post',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                            requestFrom: userInfo.userID,
                            requestTo: self.props.book.uploadedBy,
                            bookId: self.props.book._id,
                        })
                    })
                        .then((response) => {
                            return (response.json());
                        }).then((data) => {
                            console.log("Im in handle user req");
                            console.log(data);
                            if(data.message.requestFrom===data.message.requestTo){
                                console.log("cannot request");
                                self.setState({ errors: true });
                            }
                            else 
                            {
                                if (data.success == true) {
                                self.setState({
                                    requestSuccess: true,
                                    notRequested: false,
                                    showModal: true
                                })
                            }
                            }
                        })
                
                })
                .catch(function (error) {
                    // return error;
                    self.setState({ errors: error });
                });
        }
    }

   async componentDidMount() {
       console.log("imm instarting of mount");
        let userid = localStorage.getItem("userinfo");
        let self = this;
        fetch(`${baseUrl}/users/${userid}`)
            .then(function (response) {
                return response.json();
            })
            .then((userInfo) => {
                console.log(userInfo);
                fetch('http://localhost:3002/userRequests/viewRequestByFromUserId/' + userInfo.userID, {
                    method: 'get'
                })
                    .then((response) => {
                        return (response.json());
                    }).then((data) => {
                        console.log("Im in compoenntmountdata")
                        console.log(data);
                        if (data.success == true) {
                           
                            data.message.map((eachRequest) => {
                                if(eachRequest.requestResult.requestFrom!==eachRequest.requestResult.requestTo){
                                if (eachRequest.requestResult.bookId == self.props.book._id) {
                                    self.setState({
                                        requestSuccess: true,
                                        notRequested: false,
                                        errors:false
                                    })
                                
                                }
                                 }
                            })
                            
                        }
                    })
            })
            .catch(function (error) {
                // return error;
                self.setState({ errors: error });
            });
    }

    render() {
        console.log(this.props);
        console.log(this.state.showModal);
        console.log(this.state.requestSuccess);
        if (this.state.requestSuccess === true && this.state.showModal === true) {
            return (
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <h2> Your Request has been sent to <strong>{this.props.book.uploadedBy}!!</strong></h2>
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
            )
        }
        if (this.state.login == false) {
            return (
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <h2> Kindly Login First!!</h2>
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
            )
        }
        else {

            return (
                <div className="container">
                    <div className="each-card">
                        <div className="container-fliud">
                            <div className="wrapper row">
                                <div className="preview col-md-4">

                                    <div className="preview-pic tab-content">
                                        <div className="tab-pane active" id="pic-1"><img alt="book image" src={`../bookPageImages/${this.props.book.bookPhotoID1}.png`} /></div>
                                        {/*<div className="tab-pane" id="pic-2"><img src={`../bookPageImages/${this.props.bookPhotoID1}.png`} /></div>
                                        <div className="tab-pane" id="pic-3"><img src={`../bookPageImages/${this.props.bookPhotoID1}.png`} /></div>
                                        <div className="tab-pane" id="pic-4"><img src={`../bookPageImages/${this.props.bookPhotoID1}.png`} /></div>
                                        <div className="tab-pane" id="pic-5"><img src={`../bookPageImages/${this.props.bookPhotoID1}.png`} /></div>*/}
                                    </div>
                                    {/*<ul className="preview-thumbnail nav nav-tabs">
                                    <li className="active"><a data-target="#pic-1" data-toggle="tab"><img src={`../bookPageImages/${this.props.bookPhotoID1}.png`} /></a></li>
                                    <li><a data-target="#pic-2" data-toggle="#pic-2"><img src={"../bookPageImages/" + 2 + '.jpg'} /></a></li>
                                    <li><a data-target="#pic-3" data-toggle="#pic-3"><img src={"../bookPageImages/" + 3 + '.jpg'} /></a></li>
                                    <li><a data-target="#pic-4" data-toggle="#pic-4"><img src={"../bookPageImages/" + 4 + '.jpg'} /></a></li>
                                    <li><a data-target="#pic-5" data-toggle="#pic-5"><img src={"../bookPageImages/" + 5 + '.jpg'} /></a></li>
                                </ul>*/}

                                </div>
                                
                                <div className="details col-md-6">
                                    
                                    <h1 className="product-title">{this.props.book.Title}</h1>
                                    <span className="review-no"><strong>Author: </strong>{this.props.book.Author}</span>
                                    <br />
                                    <span className="review-no"><strong>Uploaded By This User: </strong>{this.props.book.uploadedBy}</span>
                                    <br />
                                    <span className="review-no"><strong>Value of Book: </strong>{this.props.book.bookPointsValue}</span>
                                    <br />
                                    <p className="product-description">{this.props.book.Description}</p>
                                    <div className="action">
                                        {this.state.errors && <p className="error-message">{"cannot Request your own book"}</p>}
                                        { this.state.notRequested && <RaisedButton className="primary" label="Request This Book" onClick={this.handleRequest.bind(this)} backgroundColor="#006dcc" labelColor="white" />}
                                        { this.state.requestSuccess && <RaisedButton className="primary" label="Book Already Requested" disabled={true} disabledBackgroundColor="white"
                                                            disabledLabelColor="black" />}
                                        <RaisedButton label="Contact the Owner" href={`/private_message/${this.props.book.uploadedBy}`} backgroundColor="#006dcc" labelColor="white" />
                                        {/*<button className="add-to-cart btn btn-default" type="button">Request this book</button>*/}
                                        {/*<button className="like btn btn-default" type="button"><span className="fa fa-heart"></span></button>*/}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}


