import React from 'react';
// import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
 import './CreateEachBookCard.css'

import {
    Card, CardImg, CardText, CardBlock, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';

export default class CreateEachBookCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="col-md-4">
                <Card>
                    <CardBlock>
                        <CardTitle>{this.props.Title}</CardTitle>
                        <CardSubtitle>{this.props.Author}</CardSubtitle>
                    </CardBlock>
                    <img width="100%" src={"./images/" + 1 + '.jpg'} alt="Card image cap" />
                    <CardBlock>
                        <CardText>{this.props.Description}</CardText>
                        <CardLink href={`/books/${this.props.bookID}`}>More Info</CardLink>
                        <CardLink href="#">Like</CardLink>
                    </CardBlock>
                </Card>
            </div>
        );
    }
}