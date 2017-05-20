import React from "react";
//import '../styles/FooterCSS.css'

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
            <div className="col-md-12 text-center">
              
        </div>
        <div className="subfooter">
          <p>Made with Love (♥) in New York City by</p>
            <a href="https://www.linkedin.com/in/janina-grayson-95695064/">@Janina</a> 
            / <a href="https://www.linkedin.com/in/jhansi-kunam-ba162012b/">@Jhansi</a> 
           / <a href="http://www.linkedin.com/in/jitendra-purohit-bb3389107/">@Jitendra</a>           
          / <a href="https://www.linkedin.com/in/qurika-garg/">@Qurika</a>           
          / <a href="https://www.linkedin.com/in/yudong-cao-0a41a484/">@Yudong</a> <br />
          <p>2017 © ShareMyBooks || All rights Reserved.</p>
        </div>
      </div>
    );
  }
}