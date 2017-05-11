import React from 'react';
// import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
 //import '../styles/CreateEachBookCard.css'

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
                    <CardBlock>
                        <CardTitle>{this.props.Title}</CardTitle>
                        <CardSubtitle>{this.props.Author}</CardSubtitle>
                    </CardBlock>
                    <img  height="10px" style={{alignSelf: 'center', width: '150px', height: '200px' }} src={`../bookThumbnailImages/${this.props.bookPhotoID1}.png`} alt="Card image cap" />
                    <CardBlock>
                        <CardText>{this.props.Description}</CardText>
                        <CardLink href={`/books/${this.props.bookID}`}>More Info</CardLink>
                        
                    </CardBlock>
                </Card>
            </div>
        );
    }
}