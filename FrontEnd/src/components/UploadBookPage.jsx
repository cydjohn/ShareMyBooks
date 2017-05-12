// old version



import React from "react";
import PropTypes from 'prop-types';
//import '../styles/UploadBook.css';
import '../styles/authentication.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// var Router = require('react-router');
// import Dropzone from 'react-dropzone';
// import request from 'superagent';
import FileInput from 'react-file-input';
import FileReaderInput from 'react-file-reader-input';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



const UploadBookPage =({
    onSubmit,
  onChange,
  errors,
  success,
  book,
  onChangeFile,
  onConditionChange

  //onChangeFileRead
  
})=>(

  <Card className="container1">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Upload Book</h2>

{errors && <p className="error-message">{errors}</p>}
{success && <p className="success-message">{success}</p>}

      

    

      <div className="field-line">
        <TextField
          floatingLabelText="Title"
          name="title"
         // errorText={errors.}
          onChange={onChange}
          value={book.title}
        />
      </div>

 <div className="field-line">
        <TextField
          floatingLabelText="Year"
          name="year"
         // errorText={errors.}
          onChange={onChange}
          value={book.year}
        />
      </div>

       <div className="field-line">
        <TextField
          floatingLabelText="Category"
          name="category"
         // errorText={errors.}
          onChange={onChange}
          value={book.category}
        />
        </div>


          <div className="field-line">
        
<SelectField
          floatingLabelText="Select a Condition:"
          name="condition"
          value={book.condition}
          onChange={onConditionChange}
        >
            <MenuItem key={0} value={"good"} primaryText={"good"} />
            <MenuItem key={1} value={"great"} primaryText={"great"} />
            <MenuItem key={2} value={"poor"} primaryText={"poor"} />
          
        </SelectField>

      </div>


          <div className="field-line">
        <TextField
          floatingLabelText="Location"
          name="location"
         // errorText={errors.}
          onChange={onChange}
          value={book.location}
        />

      </div>

       <div className="field-line">
        <TextField
          floatingLabelText="Author"
          name="author"
         // errorText={errors.}
          onChange={onChange}
          value={book.author}
        />
      </div>

          <div className="field-line">
        <TextField
          floatingLabelText="Description"
          name="description"
         // errorText={errors.}
          onChange={onChange}
          value={book.description}
        />
      </div>
   
 <div className="FileUpload1">
          <FileInput name="myImage"
                   accept=".png,.gif,.jpeg, .jpg"
                   placeholder="Click here to upload the Image..."
                   className="inputClass"
                   onChange={onChangeFile} />
        </div>

      <div className="button-line">

        <RaisedButton type="submit" label="UPLOAD BOOK" primary />

      </div>
{/*<label htmlFor="my-file-input">Upload a File:</label>
        <FileReaderInput as="binary" id="my-file-input"
                         onChange={onChangeFileRead}>
          <button>Select a file!</button>
        </FileReaderInput>*/}
        </form>
  </Card>


  );

UploadBookPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired,
  onChangeFile:PropTypes.func.isRequired,
 // onChangeFileRead:PropTypes.func.isRequired
};

export default UploadBookPage;



 
   

//     return (
   
// {/*<div className="container">
// 	<div className="login-container">
//             <div id="output"></div>
//              <form onSubmit={this.dropHandler}>  
//      <div className="field-line">
//         <TextField
//           floatingLabelText="Author"
//           type="text"
//           name="author"
//           value={this.state.author}
//           onChange={this.changeAuthor.bind(this)}
         
//         />
       
        
//       </div>
//                     <button className="btn btn-info btn-block login saveButton" type="submit">Save</button>
                    
//                 </form>
           
//         </div>
        
// </div>*/}
//     )
//   }
// }
  
// //ReactDOM.render(<ImageUpload/>, document.getElementById("mainApp"));
