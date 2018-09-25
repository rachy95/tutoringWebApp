import React, { Component } from "react";
import { auth } from "../FirebaseConfig";
import "../App.css";
import { Link, withRouter } from "react-router-dom";

const INITIAL_STATE = {
  sessionType: "",
  topic: "",
  startTime: "",
  endTime: "",
  error: null
};

var tutor, startTime, endTime, day, course;

const ConfirmTutoringDetails = ({ history }) => (
  <div>
    <ConfirmTutoringForm history={history} />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class ConfirmTutoringForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { ...INITIAL_STATE };
    tutor = this.props.history.location.tutor
      ? this.props.history.location.tutor
      : {};
    var availableTime = this.props.history.location.availableTime
      ? this.props.history.location.availableTime
      : "";
    course = this.props.history.location.courseName
      ? this.props.history.location.courseName
      : "";
    day = this.props.history.location.day
      ? this.props.history.location.day
      : "";
    if (availableTime && availableTime.indexOf("-") > 0) {
      var times = availableTime.split("-");
      startTime = times[0];
      endTime = times[1];
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  checkInputNotEmpty(value) {
    if (value === "") {
      alert("input cannot be empty");
      return;
    }
  }

  submitRequest(e) {
    const { history } = this.props;

    e.preventDefault();
    var email = document.getElementById("email_input").value;
    var password = document.getElementById("password_input").value;

    //the email and password can't be empty
    this.checkInputNotEmpty(email);
    this.checkInputNotEmpty(password);

    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push("/TutorHomePage");
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorCode + errorMessage);
        this.setState(byPropKey("error", error));
        console.log(error);
      });
  }

  render() {
    return (
      <div className="confirm-details-page">
        <div id="logo_title">
          <span>
            <i>ExcelLassonde</i>
          </span>
        </div>
        <form>
          <div class="form-group">
            <label for="tutorName">
              <b>Tutor:</b>
            </label>
            <input value={tutor.name} name="tutorName" class="form-control" />
            <label for="course">
              <b>Course:</b>
            </label>
            <input
              value={course}
              name="course"
              class="form-control input_boxes"
            />
            <label for="sessionType">
              <b>Session Type:</b>
            </label>
            <select name="sessionType" onChange={this.handleChange}>
              <option value="one-on-one">One-on-One</option>
              <option value="group">Group</option>
            </select>
            <label for="topic">
              <b>Topic(s):</b>
            </label>
            <input
              value={this.state.topic}
              name="topic"
              onChange={this.handleChange}
              class="form-control input_boxes"
              placeholder="please include everything you need help with"
            />
            <label for="day">
              <b>Day:</b>
            </label>
            <input value={day} name="day" class="form-control input_boxes" />
            <label for="startTime">
              <b>Starts:</b>
            </label>
            <input
              value={this.state.startTime}
              onChange={this.handleChange}
              name="startTime"
              class="form-control input_boxes"
            />
            <label for="endTime">
              <b>Ends:</b>
            </label>
            <input
              value={this.state.endTime}
              onChange={this.handleChange}
              name="endTime"
              class="form-control input_boxes"
            />
          </div>
          <button
            type="back"
            id="back"
            onClick={this.goBack}
            class="btn btn-primary"
          >
            BACK
          </button>
          <button
            type="submit"
            id="submit_request"
            onClick={this.submitRequest}
            class="btn btn-primary"
          >
            SUBMIT REQUEST
          </button>
        </form>
      </div>
    );
  }
}
export default withRouter(ConfirmTutoringDetails);
export { ConfirmTutoringForm };
