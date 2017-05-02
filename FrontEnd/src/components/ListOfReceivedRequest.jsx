import React from "react";

import ViewRequest from "./ViewRequest";


export default class ListOfReceivedRequest extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="AllBooks">
                {this.props.requests.map((eachRequest) => {

                    return (
                        <ViewRequest
                            requests={eachRequest}
                       />
                    );
                })}
            </div>
        );
    }
}