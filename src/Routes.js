import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import TutorLogin from "./containers/TutorLogin";
import TutorSignup from "./containers/TutorSignup";
import StudentLogin from "./containers/StudentLogin";
import DisplayCourses from "./containers/DisplayCoursesPage";
import TutorHomePage from "./containers/TutorHomePage";
import DisplayCoursesPage from "./containers/DisplayCoursesPage";
import DisplayAvailabilitiesPage from "./containers/DisplayAvailabilitiesPage";
import ConfirmTutoringDetails from "./containers/ConfirmTutoringDetails";

export default props => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/TutorLogin" exact component={TutorLogin} />
    <Route path="/TutorSignup" exact component={TutorSignup} />
    <Route path="/StudentLogin" exact component={StudentLogin} />
    <Route path="/StudentDisplayCourses" exact component={DisplayCourses} />
    <Route path="/TutorHomePage" exact component={TutorHomePage} />
    <Route
      path="/DisplayCoursesPage"
      exact
      component={() => (
        <DisplayCoursesPage
          courses={props.courses}
          tutorsInformation={props.tutors}
        />
      )}
    />
    <Route
      path="/DisplayAvailabilitiesPage"
      exact
      component={DisplayAvailabilitiesPage}
    />
    <Route
      path="/ConfirmTutoringDetails"
      exact
      component={ConfirmTutoringDetails}
    />
  </Switch>
);
