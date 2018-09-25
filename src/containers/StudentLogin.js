import React, { Component } from "react";
import "../App.css";

class StudentLogin extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: "",
      email: ""
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  checkInputNotEmpty(e, value) {
    if (value === "") {
      alert("input cannot be empty");
      //return;
    }
  }

  login(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push("/DisplayCoursesPage");
  }

  render() {
    return (
      <div className="login-page">
        <div id="logo_title">
          <span>
            <i>ExcelLassonde</i>
          </span>
        </div>
        <form>
          <div class="form-group">
            <input
              value={this.state.name}
              onChange={this.handleChange}
              type="name"
              name="name"
              class="form-control"
              id="name_input"
              aria-describedby="first name"
              placeholder="First name"
            />
            <input
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              class="form-control input_boxes"
              id="name_input"
              placeholder="Email"
            />
          </div>
          <button
            type="submit"
            id="student_login"
            onClick={this.login}
            class="btn btn-primary"
          >
            Book A Session
          </button>
        </form>
      </div>
    );
  }
}
export default StudentLogin;
