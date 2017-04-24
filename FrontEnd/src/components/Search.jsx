import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/Search.css';
/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
const style = {
    margin: 12,
};

const AutoCompleteStyle = {
    width: 600
};
const colors = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Purple',
    'Black',
    'White',
];

const Search = ({
  onSubmit,
    onUpdateInput,
}) => (
        <div className="searchDiv">
            <center>
                <form action="/" onSubmit={onSubmit}>
                    <div className="SearchBar">
                        <AutoComplete
                            hintText="Enter your book name here."
                            dataSource={colors}
                            onUpdateInput={onUpdateInput}
                            floatingLabelText="Search box"
                            fullWidth={true}
                        />
                    </div>
                    <div className="SearchButton">
                        <RaisedButton label="Search" type="submit" primary={true} fullWidth={true} />
                    </div>
                </form>
            </center>
        </div>
    );

Search.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onUpdateInput: PropTypes.func.isRequired,

};

export default Search;
