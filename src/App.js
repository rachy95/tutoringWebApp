import React, { Component } from "react";
import Routes from "./Routes";
import { database } from "./FirebaseConfig";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutors: null,
      courses: null
    };
  }
  componentDidMount() {
    var courses = [];
    var tutors = [];
    database
      .ref("Tutors")
      .once("value")
      .then(snapshot => {
        var tutorsFromDatabase = snapshot.val();
        for (var tutorName in tutorsFromDatabase) {
          var tutorInfo = tutorsFromDatabase[tutorName];
          tutors.push(tutorInfo);
        }
        for (var i = 0; i < tutors.length; i++) {
          var tutorCourses = tutors[i].courses;
          //add the course to the list of courses if it doesnt exist yet
          for (var j = 0; j < tutorCourses.length; j++) {
            var course = tutorCourses[j];
            if (courses.indexOf(course) < 1) {
              courses.push(course);
            }
          }
        }
        this.setState({ tutors: tutors, courses: courses });
      });
  }

  render() {
    return (
      <div className="App-container">
        {this.state.courses &&
          this.state.tutors && (
            <Routes tutors={this.state.tutors} courses={this.state.courses} />
          )}
      </div>
    );
  }
}

export default App;
