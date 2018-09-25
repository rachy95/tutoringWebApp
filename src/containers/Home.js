import React, { Component } from "react";
import logo from "../excelLogo.png";
import "../App.css";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="Main-page">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="ExcelLassonde" />
        </header>
        <div className="Main-page-text">
          <h1>Ready to book sessions? </h1>
          <h4>
            We are so glad that you are here. ExcelLassonde has been serving
            Lassonde students for over 5 years now and we want to continue to do
            more. If you would like to get any help with any of the courses we
            offer blah blah{" "}
          </h4>
        </div>
        <div className="Main-page-button">
          <Link to="/TutorLogin">
            <button id="tutor_btn">I AM A TUTOR</button>
          </Link>
        </div>
        <div>
          <Link to="/StudentLogin">
            <button id="student_btn">I AM A STUDENT</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
