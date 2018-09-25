import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

class DisplayCoursesPage extends Component {
  constructor(props) {
    super(props);
    this.onCourseClicked = this.onCourseClicked.bind(this);
  }

  createButtonLink(name) {
    var linkTo = {
      pathname: "/DisplayAvailabilitiesPage",
      courseName: name,
      tutorsInformation: this.props.tutorsInformation
    };
    return (
      <Link key={name} to={linkTo}>
        <button id={name} key={name}>
          {name}
        </button>
      </Link>
    );
  }

  createButtons() {
    if (this.props.courses) {
      return this.props.courses.map(this.createButtonLink.bind(this));
    }
  }

  onCourseClicked(id) {
    return "dummy";
  }

  render() {
    return (
      <div>
        <div>
          <p>Courses we offer this term </p>
        </div>
        <div className="App-container" id="coursesOffered">
          {this.createButtons()}
        </div>
      </div>
    );
  }
}
export default DisplayCoursesPage;
