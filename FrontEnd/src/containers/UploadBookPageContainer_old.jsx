
import UploadBookPage from '../components/UploadBookPage.jsx'
import router from 'react-router';
var Router = require('react-router');
//import Dropzone from 'react-dropzone';
import request from 'superagent';
import React, { PropTypes } from 'react';
var FormData = require('form-data');

export default class UploadBookPageContainer extends React.Component {

    /**
     * 
     * @param {*setting props for Uploadpage} props 
     */
  constructor(props, context) {
    super(props,context);


    // set the initial component state
    this.state = {
      errors: '',
      book: {
        uploadedFile: null,
      //uploadedFileCloudinaryUrl: '',
      fileName:'',
      imagePreviewUrl: '',    
          author:'',
          year:'',
          category:'',
          condition:'',
          location:'',
          description:'',
          title: ''
                  
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changebook = this.changebook.bind(this);
  }

  /**
   * 
   * @param {} e - Javascript event
   */

processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    console.log("starting form processing on front end...");
    const self=this;

    // create a string for an HTTP body message
    const author = encodeURIComponent(this.state.book.author);
   
    console.log(author);
    console.log(this.state.book.author);
    console.log(this.state.book.category);
    console.log(this.state.book.condition);
    console.log(this.state.book.uploadedFile)

    var formData = new FormData();
 
  
  let data = new FormData();
  data.append('file', document);
  data.append('name', name);



  formData.append('file',this.state.book.uploadedFile);
  
    console.log(formData);

  let reader = new FileReader();

    var photo = new FormData();
  photo.append('photo', this.state.book.uploadedFile);
  //photo.append('')
  
  photo.append('author',this.state.book.author);
  photo.append('category',this.state.book.category);
  photo.append('condition',this.state.book.condition);
  photo.append('year',this.state.book.year);
  photo.append('description',this.state.book.description);
  photo.append('location',this.state.book.location);
  

  console.log(photo);
  let userid = localStorage.getItem("userinfo");

//let userid = localStorage.getItem("userinfo");
  //request.post('http://localhost:3002/books/')
  //  .send(photo)
  //  .end(function(err, resp) {
   //   if (err) { console.error(err); }
   //   return resp;
   //});
   fetch('http://localhost:3002/books', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        uploadedBy: userid,
        Title: this.state.book.title,
        Author:this.state.book.author,
        Location:this.state.book.location,
        Category:this.state.book.category,
        Condition:this.state.book.condition,
        Year: this.state.book.year,
        Description: this.state.book.description,
        Photo: this.state.book.uploadedFile.name

      })
    })
      .then((response) => {
         return (response.json());
      }).then(function (message) {
          console.log("returned response from attempting to add book to db:")
        console.log(message);
        if(message){
            //Router.browserHistory.push('/');//redirect to home page
            self.setState({errors:JSON.stringify(message)});
        }
       
      })
    

  }

changebook(event) {
      const self=this;

    const field = event.target.name;
    const book = self.state.book;
    book[field] = event.target.value;
    
    self.setState({
      book
    });
  }

handleChange(event) {

     const self=this;
     const book = self.state.book;
    book['uploadedFile']=event.target.files[0];
    book['fileName']=event.target.files[0].name;
    console.log(this.state.book['uploadedFile']);
    console.log('Selected file:', event.target.files[0]);
}

// handleChangeFile (e, results){
//     results.forEach(result => {
//       const [e, file] = result;
//       this.props.dispatch(uploadFile(e.target.result));
//       console.log(`Successfully uploadedRead ${file.name}!`);
//     });
// }

dropHandler(e) {

//   //const author=encodeURIComponent(this.state.author);
  
//   e.preventDefault()
  
//   var formData = new FormData();
//  // formData.append('formData', this.state.uploadedFile);
//   formData.append('author',this.state.author);
  
//     console.log(formData);

//   let reader = new FileReader();

//   //  reader.onloadend = () => {
//   //     this.setState({
        
//   //       imagePreviewUrl: reader.result
//   //     });
//   //   }

//     //reader.readAsDataURL(file)

//   request.post('http://localhost:3002/books/')
//     .send(formData)
//     .end(function(err, resp) {
//       if (err) { console.error(err); }
//       return resp;
//     });
}


  /**
   * Render the component.
   */
  render() {
//  let {imagePreviewUrl} = this.state;
//     let $imagePreview = null;
//     if (imagePreviewUrl) {
//       $imagePreview = (<img src={imagePreviewUrl} />);
//     } else {
//       $imagePreview = (<div>No img</div>);
//     }
    return (
      <UploadBookPage
        onSubmit={this.processForm.bind(this)}
        onChange={this.changebook.bind(this)}
        errors={this.state.errors}
        book={this.state.book}
        //onDrop={this.onDrop.bind(this)}
        onChangeFile={this.handleChange.bind(this)}
        //onChangeFileRead={this.handleChange.bind(this)}

      />
    );
  }

}

UploadBookPageContainer.contextTypes = {
  router: PropTypes.object.isRequired
};




 
