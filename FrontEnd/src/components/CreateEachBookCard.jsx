import React from 'react';
// import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
 import '../styles/CreateEachBookCard.css'

import {
    Card, CardImg, CardText, CardBlock, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';

export default class CreateEachBookCard extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.bookPhotoID1);
    }

    render() {
        return (

            <div className="col-md-4">
                <Card>
                    <div><h1></h1><h2></h2></div>
                    <h3><CardBlock>
                        <h4><CardTitle>{this.props.Title}</CardTitle></h4>
                        <h5><CardSubtitle>{this.props.Author}</CardSubtitle></h5>
                        
                    </CardBlock></h3>
                    <img  height="10px" style={{alignSelf: 'center', width: '150px', height: '200px' }} src={`../bookThumbnailImages/${this.props.bookPhotoID1}.png`} alt="Card image cap" />
                    <CardBlock>
                        <CardText>{this.props.Description}</CardText>
                        <CardLink className="btn btn-primary" href={`/books/${this.props.bookID}`}>More Info</CardLink>
                        
                    </CardBlock>
                </Card>
            </div>
        );
    }
}