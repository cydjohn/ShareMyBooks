import React, { PropTypes } from 'react';
// import { Card, CardTitle } from 'material-ui/Card';
import CreateListOfBooks from "../components/CreateListOfBooks.jsx";
import Search from "../components/Search.jsx";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { getBooks } from "../data/books";
const baseUrl = "http://localhost:3002";
import router from 'react-router';
import '../styles/Search.css';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Books: [],
            keyword: '',
            category: -1,
            categoryList: [],
            pageNumber: 0,
            recentPageNumber: 0,
            isRecent: false,
        };
    }


    async componentDidMount() {
        let self = this;
        fetch(`${baseUrl}/books/page/0`)
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
        if (this.state.keyword && this.state.category === -1) {
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

        else if (this.state.keyword === '' && this.state.category !== -1) {
            console.log("Im in category");
            fetch(`${baseUrl}/books/category/` + this.state.category)
                .then(function (response) {
                    return response.json();
                })
                .then((BookList) => {
                    console.log(BookList);
                    self.setState({ Books: BookList })
                })
                .catch(function (error) {
                    return error;
                });
        }

        else if (this.state.keyword === '' && this.state.category === -1) {
            console.log("Im in no search");
            window.location.reload();


        }
        else {
            console.log("Im in searchByCategory");
            fetch(`${baseUrl}/books/searchByCategory`, {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    keyword: this.state.keyword,
                    category: this.state.category
                })
            }).then(function (response) {
                return response.json();
            })
                .then((BookList) => {
                    console.log(BookList);
                    self.setState({ Books: BookList })
                })
                .catch(function (error) {
                    return error;
                });

        }


    }
    handlenextPage() {
        let self = this;
        if (!self.state.isRecent) {
            fetch(`${baseUrl}/books/page/${++self.state.pageNumber}`)
                .then(function (response) {
                    return response.json();
                })
                .then((BookList) => {
                    self.setState({
                        Books: BookList,
                    })
                })
                .catch(function (error) {
                    return error;
                });
        }
        else {
            fetch(`${baseUrl}/books/recent/${++self.state.recentPageNumber}`)
                .then(function (response) {
                    return response.json();
                })
                .then((BookList) => {
                    self.setState({
                        Books: BookList,
                    })
                })
                .catch(function (error) {
                    return error;
                });
        }
    }

    handlePreviousPage() {
        let self = this;
        if (!self.state.isRecent) {
            fetch(`${baseUrl}/books/page/${--self.state.pageNumber}`)
                .then(function (response) {
                    return response.json();
                })
                .then((BookList) => {
                    self.setState({
                        Books: BookList,
                    })
                })
                .catch(function (error) {
                    return error;
                });
        }
        else {
            fetch(`${baseUrl}/books/recent/${--self.state.recentPageNumber}`)
                .then(function (response) {
                    return response.json();
                })
                .then((BookList) => {
                    self.setState({
                        Books: BookList,
                    })
                })
                .catch(function (error) {
                    return error;
                });
        }
    }
    handleRecentBook() {
        let self = this;
        fetch(`${baseUrl}/books/recent/0`)
            .then(function (response) {
                return response.json();
            })
            .then((BookList) => {
                self.setState({
                    Books: BookList,
                    isRecent: true,
                    recentPageNumber: 0,
                })
            })
            .catch(function (error) {
                return error;
            });
    }
    processInput(event) {
        this.setState({ keyword: event });
    }
    handleHomeBook() {
        window.location.reload();
    }
    processCategoryChange(event, index, value) {
        console.log("selected category: " + value);
        this.setState({ category: value });
    }
    render() {

        if (this.state.keyword === '' && this.state.category === -1) {
            return (
                <div className="container">
                    <div className="searcDiv">
                        <div className="CategoryDD">
                            <SelectField
                            floatingLabelStyle={{ color: 'slateblue' }}
                                floatingLabelText="Category:"
                                name="category"
                                value={this.state.category}
                                onChange={this.processCategoryChange.bind(this)}
                            >
                                <MenuItem key={-1} value={-1} primaryText={"select category"} />
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
                    <div className="homeButton">
                        <button className="recent" onClick={this.handleRecentBook.bind(this)}>Recently Uploaded</button>
                        <button className="home" onClick={this.handleHomeBook.bind(this)}>Home Page</button>
                    </div>
                    <CreateListOfBooks ListOfBooks={this.state.Books} />
                    <div className="homeButton">
                        <button onClick={this.handlePreviousPage.bind(this)}>Previous Page</button>
                        <button className="home" onClick={this.handlenextPage.bind(this)}>Next Page</button>
                    </div>
                </div>
            )
        }
        else if (this.state.Books.length === 0)
            return <div >
                <div className="homeButton">
                    <button className="recent" onClick={this.handleRecentBook.bind(this)}>Recently Uploaded</button>
                    <button className="home" onClick={this.handleHomeBook.bind(this)}>Home Page</button>
                </div>
                <h2>No Books In this Category</h2>
            </div>

        else {
            return (
                <div className="container">
                    <div className="searcDiv">
                        <label>
                        <div className="CategoryDD">
                            <label> 
                            <SelectField
                            floatingLabelStyle={{ color: 'slateblue' }}
                                floatingLabelText="Category:"
                                name="category"
                               
                                value={this.state.category}
                                onChange={this.processCategoryChange.bind(this)}
                            >
                                <MenuItem key={-1} value={-1} primaryText={"select category"} />
                                {this.state.categoryList.map((c, index) =>
                                    <MenuItem key={index} value={c} primaryText={c} />
                                )}
                            </SelectField>
                            </label>
                        </div>
                        </label>
                    </div>
                    <Search
                        onSubmit={this.processSearch.bind(this)}
                        onUpdateInput={this.processInput.bind(this)}
                    />
                    <div className="homeButton">
                        <button className="recent" onClick={this.handleRecentBook.bind(this)}>Recently Uploaded</button>
                        <button className="home" onClick={this.handleHomeBook.bind(this)}>Home Page</button>
                    </div>
                    <CreateListOfBooks ListOfBooks={this.state.Books} />
                    <div className="homeButton">
                        <button onClick={this.handlePreviousPage.bind(this)}>Previous Page</button>
                        <button className="home" onClick={this.handlenextPage.bind(this)}>Next Page</button>
                    </div>
                </div>
            )
        }
    }
}

HomePage.contextTypes = {
    router: PropTypes.object.isRequired
};