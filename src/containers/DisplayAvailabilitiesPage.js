import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import logo from "../excelLogo.png";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
class DisplayAvailabilitiesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: this.props.location.courseName
        ? this.props.location.courseName
        : "",
      tutorsInformation: this.props.location.tutorsInformation
        ? this.props.location.tutorsInformation
        : []
    };
  }

  getAvailableTutorsGivenCourse() {
    var tutorsInfo = this.state.tutorsInformation;
    var tutorsThatTeachCourse = [];
    for (var i = 0; i < tutorsInfo.length; i++) {
      if (tutorsInfo[i].courses.includes(this.state.courseName)) {
        tutorsThatTeachCourse.push(tutorsInfo[i]);
      }
    }
    return tutorsThatTeachCourse;
  }

  //we only pass in the name of the tutor and the time
  createButton(day, tutor) {
    var chosenTutor;
    for (var i = 0; i < this.state.tutorsInformation.length; i++) {
      if (this.state.tutorsInformation[i].name == tutor.name) {
        chosenTutor = this.state.tutorsInformation[i];
        break;
      }
    }

    var tutorName = tutor.name;
    var availableTime = tutor.time;

    var linkTo = {
      pathname: "/ConfirmTutoringDetails",
      courseName: this.state.courseName,
      tutor: chosenTutor,
      day: day,
      availableTime: availableTime
    };

    return (
      <Link key={availableTime} to={linkTo}>
        <button key={availableTime} className="availabilty-button-style">
          <img src={logo} className="inline-logo" />
          <span className="availability-button-text">{tutorName}</span>
          <span className="availability-button-text">{availableTime}</span>
        </button>
      </Link>
    );
  }

  createNoTutorsAvailableSpan(day) {
    return (
      <span className="no-tutors-available-span">
        sorry, we do not have any tutors available for {this.state.courseName}{" "}
        on {day}.
      </span>
    );
  }
  createTutorButtons(day) {
    var tutorsForThisDay = [];
    var tutors = this.getAvailableTutorsGivenCourse();
    //go through the tutors
    for (var i = 0; i < tutors.length; i++) {
      if (!!tutors[i].availability[day]) {
        var availabilties = tutors[i].availability[day];
        if (!!availabilties) {
          for (var availability in availabilties) {
            if (!!availability) {
              var tutor = {
                name: tutors[i].name,
                time: availability
              };
              tutorsForThisDay.push(tutor);
            }
          }
        }
      }
    }

    if (tutorsForThisDay.length < 1) {
      return this.createNoTutorsAvailableSpan(day);
    } else {
      return tutorsForThisDay.map(this.createButton.bind(this, day));
    }
  }

  createRows(day) {
    return (
      <tr key={day}>
        <td>{day}</td>
        <td>
          <div style={{ width: "100%" }}>{this.createTutorButtons(day)}</div>
        </td>
      </tr>
    );
  }

  createTableContent() {
    //create a row for each of the day of the week
    return daysOfWeek.map(this.createRows.bind(this));
  }

  render() {
    return (
      <div className="display-tutors-page">
        <h1>{this.state.courseName}</h1>

        <table className="availability-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Day</th>
              <th>Tutors Available</th>
            </tr>
          </thead>
          <tbody>{this.createTableContent()}</tbody>
        </table>
        <div id="backButtonDiv">
          <button>BACK</button>
        </div>
      </div>
    );
  }
}
export default DisplayAvailabilitiesPage;
