
import UploadBookPage from '../components/UploadBookPage.jsx'
import router from 'react-router';
var Router = require('react-router');
//import Dropzone from 'react-dropzone';
import request from 'superagent';
import React, { PropTypes } from 'react';

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
      success: '',
      book: {
        title:'',
        uploadedFile: null,
      //uploadedFileCloudinaryUrl: '',
      fileName:'',
      imagePreviewUrl: '',    
          author:'',
          year:'',
          category:'',
          condition:'',
          location:'',
          description:''

        
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
    const self=this;

    // create a string for an HTTP body message
    const author = encodeURIComponent(this.state.book.author);
   
    console.log(author);
    console.log(this.state.book.author);
    console.log(this.state.book.category);
    console.log(this.state.book.condition);
    console.log(this.state.book.uploadedFile)

    var formData = new FormData();
 
  
  



  //formData.append('file',this.state.book.uploadedFile);
  
    console.log(formData);

  let reader = new FileReader();

    var photo = new FormData();
  photo.append('photo', this.state.book.uploadedFile);
  //photo.append('')
  photo.append('Author',this.state.book.author);
  photo.append('Title',this.state.book.title);
  photo.append('Category',this.state.book.category);
  photo.append('Condition',this.state.book.condition);
  photo.append('Year',this.state.book.year);
  photo.append('Description',this.state.book.description);
  photo.append('Location',this.state.book.location);
  
 let userid = localStorage.getItem("userinfo");
  photo.append('uploadedBy',userid);
  console.log(photo);

if ((isNaN(this.state.book.year) === true) || (this.state.book.year.length != 4)){
  this.setState({errors: "The year must be a 4-digit number value", success: ''});
  return;
}
if(this.state.book.uploadedFile && this.state.book.author && this.state.book.title && 
this.state.book.category && this.state.book.condition && this.state.book.year &&
this.state.book.description && this.state.book.location){
  request.post('http://localhost:3002/books/')
    .send(photo)
    .end((err, resp) =>{
      console.log(resp.body.success);
      if (resp.body.success == false) 
      { 
        console.log("internal error:");
        console.error(err);
        console.error(resp.body.message);
        //this.setState({errors: resp.body.message});
        let errorMessage = resp.body.message;
        console.log("this:");
        console.log(this);
        this.setState({errors: errorMessage, success: ''});

      }
      else{
        console.log(resp);
        console.log(resp.body.message);
        this.setState({success: "Book sucessfully created!", errors: ''});
        //return resp;
      }
      
    });
}
else{
  this.setState({errors: "All fields are required!", success: ''});
}

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


handleConditionChange(event,index,value){
   //event.target.value is room
   console.log("changing condition dropdown:");
   console.log(value);

    //this.props.onToUserChange(value);
    //this.setState(this.state.book.condition : "great" );
    //console.log("book condition");
    //console.log(this.state.book.condition);
    let newBook = this.state.book;
newBook.condition = value;
this.setState({book: newBook});
 console.log("book condition");
    console.log(this.state.book.condition);

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

        success={this.state.success}
        book={this.state.book}
        onConditionChange={this.handleConditionChange.bind(this)}
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




 
