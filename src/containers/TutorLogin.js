import React, { Component } from "react";
import { auth } from "../FirebaseConfig";
import "../App.css";
import { Link, withRouter } from "react-router-dom";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const TutorLogin = ({ history }) => (
  <div>
    <TutorLoginForm history={history} />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class TutorLoginForm extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { ...INITIAL_STATE };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  checkInputNotEmpty(e, value) {
    if (value === "") {
      alert("input cannot be empty");
      return;
    }
  }

  login(e) {
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
      <div className="login-page">
        <div id="logo_title">
          <span>
            <i>ExcelLassonde</i>
          </span>
        </div>
        <form>
          <div class="form-group">
            <input
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              class="form-control"
              id="email_input"
              aria-describedby="emailHelp"
              placeholder="Enter YorkU email"
            />
            <input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              class="form-control input_boxes"
              id="password_input"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            id="login_btn"
            onClick={this.login}
            class="btn btn-primary"
          >
            Login
          </button>
        </form>
        <span>
          Would you like to be a tutor but don't have an account?{" "}
          <Link to="/TutorSignup">Sign up! </Link>
        </span>
      </div>
    );
  }
}
export default withRouter(TutorLogin);
export { TutorLoginForm };
