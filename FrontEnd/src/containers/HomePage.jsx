import React, { PropTypes } from 'react';
// import { Card, CardTitle } from 'material-ui/Card';
import CreateListOfBooks from "../components/CreateListOfBooks.jsx";
import Search from "../components/Search.jsx";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { getBooks } from "../data/books";
const baseUrl = "http://localhost:3002";
import router from 'react-router';
//import '../styles/Search.css';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Books: [],
            keyword: '',
            category:-1,
            categoryList:[]
        };
    }

    async componentDidMount() {
        let self = this;
        fetch(`${baseUrl}/books`)
            .then(function (response) {
                return response.json();
            })
            .then((BookList) => {
                self.setState({ Books: BookList })
            })
            .catch(function (error) {
                return error;
            });
        
         //reteiving category dropdown data
        fetch(`${baseUrl}/books/categories`)
            .then(function (response) {
                return response.json();
            })
            .then((clist) => {
                self.setState({ categoryList: clist });
            console.log("list of categories: ");
                console.log(self.state.categoryList);
            })
            .catch(function (error) {
                return error;
            });
    }

    processSearch(event) {
        event.preventDefault();
console.log("in search");
        let self = this;
        fetch(`${baseUrl}/books/search/` + this.state.keyword)
            .then(function (response) {
                return response.json();
            })
            .then((BookList) => {
                self.setState({ Books: BookList })
            })
            .catch(function (error) {
                return error;
            });
    }
    processInput(event) {
        this.setState({ keyword: event });
    }
    processCategoryChange(event,index,value) {
        console.log("selected category: " + value);
        this.setState({ category: value });
    }
    render() {
        if (this.state.Books.length === 0)
            return <div>Loading...</div>;
        return (
            <div className="container">
                <div className="searchDiv">
                <div className="CategoryDD">
                    <SelectField
          floatingLabelText="Category:"
          name="category"
          value={this.state.category}
          onChange={this.processCategoryChange.bind(this)}
        >
         <MenuItem key={-1} value={-1} primaryText={"No category selected"} />
          {this.state.categoryList.map((c, index) =>
            <MenuItem key={index} value={c} primaryText={c} />
          )}
        </SelectField>
        </div>
        </div>
                <Search
                    onSubmit={this.processSearch.bind(this)}
                    onUpdateInput={this.processInput.bind(this)} 
                    />
                <CreateListOfBooks ListOfBooks={this.state.Books} />
            </div>

        )
    }
}

HomePage.contextTypes = {
    router: PropTypes.object.isRequired
};