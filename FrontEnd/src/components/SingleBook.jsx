import React from 'react';
import Img from 'react-image'
import VisibilitySensor from 'react-visibility-sensor'
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/Singlebook.css'

export default class Singlebook extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="container">
                <div className="each-card">
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-4">

                                <div className="preview-pic tab-content">
                                    <div className="tab-pane active" id="pic-1"><img src={"../bookPageImages/" + 1 + '.jpg'} /></div>
                                    <div className="tab-pane" id="pic-2"><img src={"../bookPageImages/" + 1 + '.jpg'} /></div>
                                    <div className="tab-pane" id="pic-3"><img src={"../bookPageImages/" + 1 + '.jpg'} /></div>
                                    <div className="tab-pane" id="pic-4"><img src={"../bookPageImages/" + 1 + '.jpg'} /></div>
                                    <div className="tab-pane" id="pic-5"><img src={"../bookPageImages/" + 1 + '.jpg'} /></div>
                                </div>
                                <ul className="preview-thumbnail nav nav-tabs">
                                    <li className="active"><a data-target="#pic-1" data-toggle="tab"><img src={"../bookPageImages/" + 1 + '.jpg'} /></a></li>
                                    <li><a data-target="#pic-2" data-toggle="#pic-2"><img src={"../bookPageImages/" + 2 + '.jpg'} /></a></li>
                                    <li><a data-target="#pic-3" data-toggle="#pic-3"><img src={"../bookPageImages/" + 3 + '.jpg'} /></a></li>
                                    <li><a data-target="#pic-4" data-toggle="#pic-4"><img src={"../bookPageImages/" + 4 + '.jpg'} /></a></li>
                                    <li><a data-target="#pic-5" data-toggle="#pic-5"><img src={"../bookPageImages/" + 5 + '.jpg'} /></a></li>
                                </ul>

                            </div>
                            <div className="details col-md-6">
                                <h3 className="product-title">{this.props.book.Title}</h3>
                                <span className="review-no"><strong>Author: </strong>{this.props.book.Author}</span>
                                <br />
                                <span className="review-no"><strong>Uploaded By This User: </strong>{this.props.book.uploadedBy}</span>
                                <br />
                                <p className="product-description">{this.props.book.Description}</p>
                                <div className="action">
                                    <RaisedButton className="primary" label="Request This Book" primary />
                                    <RaisedButton label="Contact the Owner" href={`/private_message/${this.props.book.uploadedBy}`} secondary />
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


