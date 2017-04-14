import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import './Search.css';
/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
const style = {
    margin: 12,
};

const AutoCompleteStyle = {
    width: 600
};
export default class Search extends Component {
    state = {
        dataSource: [],
    };



    handleUpdateInput = (value) => {
        this.setState({
            dataSource: [
                value,
                value + value,
                value + value + value,
            ],
        });
    };

    render() {
        return (
          <div className="searchDiv">
              <center>    <div className="SearchBar">
                    <AutoComplete
                        hintText="Enter your book name here."
                        dataSource={this.state.dataSource}
                        onUpdateInput={this.handleUpdateInput}
                        floatingLabelText="Search box"
                        fullWidth={true}
                    />
                </div>
                <div className="SearchButton">
                    <RaisedButton label="Search" primary={true} fullWidth={true} />
                </div>
                </center>
            </div>
        );
    }
}