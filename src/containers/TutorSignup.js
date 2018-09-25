import React, { Component } from "react";
import { auth } from "../FirebaseConfig";
import "../App.css";
import { withRouter } from "react-router-dom";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: null
};

const TutorSignup = ({ history }) => (
  <div>
    <TutorSignupForm history={history} />
  </div>
);

class TutorSignupForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = { ...INITIAL_STATE };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  checkInputNotEmpty(e, value) {
    e.preventDefault();
    if (value === "") {
      alert("input cannot be empty");
      return;
    }
  }

  signup(e) {
    e.preventDefault();
    const { history } = this.props;

    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push("/TutorHomePage");
      })
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const isInvalid =
      this.state.password !== this.state.confirmPassword ||
      this.state.password === "" ||
      this.state.email === "" ||
      this.state.name === "";

    return (
      <div className="signup-page">
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
              class="input-fields"
              id="tutor_name_input"
              aria-describedby="Full name"
              placeholder="Full name"
            />
            <input
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              class="input-fields"
              id="signup_email_input"
              aria-describedby="emailHelp"
              placeholder="YorkU email"
            />
            <input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              class="input-fields"
              id="signup_password_input"
              placeholder="Password"
            />
            <input
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
              name="confirmPassword"
              class="input-fields"
              id="signup_confirm_password_input"
              placeholder="Confirm Password"
            />
          </div>
          <button
            disabled={isInvalid}
            type="submit"
            id="signup_btn"
            onClick={this.signup}
          >
            Sign up
          </button>
          {this.state.error && <p>{this.state.error.message}</p>}
        </form>
      </div>
    );
  }
}
export default withRouter(TutorSignup);

export { TutorSignupForm };
