import React from "react";

import CreateEachBookCard from "./CreateEachBookCard";


export default class CreateListOfBooks extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="AllBooks">
                {this.props.ListOfBooks.map((eachBook) => {
                    return (
                        <CreateEachBookCard
                            Title={eachBook.Title}
                            Author={eachBook.Author}
                            bookPhotoID1={eachBook.bookPhotoID1}
                            Description={eachBook.Description}
                            bookPointsValue={eachBook.bookPointsValue}
                            bookID={eachBook.bookID}
                        />
                    );
                })}
            </div>
        );
    }
}