import React from "react";
import './FooterCSS.css'

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
            <div className="col-md-12 text-center">
              <div className="widget">
                <h4>Follow us</h4>
                <div className="social-network">
                  <a href="https://www.facebook.com/" target="blank"><i className="icon-3x icon-facebook"></i></a>
                  <a href="https://twitter.com/" target="blank"><i className="icon-3x icon-twitter"></i></a>
                  <a href="https://www.linkedin.com" target="blank"> <i className="icon-3x icon-linkedin"></i></a>
                </div>
              </div>
        </div>
        <div className="subfooter">
          <p>Made with Love (♥) in New York City by</p> <a href="http://www.linkedin.com/in/jitendra-purohit-bb3389107/">@Jitendra</a> 
          / <a href="">@Jhansi</a> 
          / <a href="">@Qurika</a> 
          / <a href="">@Janina</a> 
          / <a href="">@Yudong</a> <br />
          <p>2017 © ShareMyBooks || All rights Reserved.</p>
        </div>
      </div>
    );
  }
}