import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import LoginPage from "./Views/log-in";
import Student from "./Views/student/student";
import Commission from "./Views/commission/commission";

export default function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <Main />
        </Route>

        {auth.isLogin ? (
          auth.isCommission ? (
            <Route path={"/commission"} component={Commission} />
          ) : (
            <Route path={"/student"} component={Student} />
          )
        ) : (
          <Route path="/login">
            <LoginPage />
          </Route>
        )}

        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

function Main() {
  return (
    <div>
      <h1>mainpage</h1>
      <Link to={"/login"}>login</Link>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <Link to="/">main</Link>
      <h3>Bulamadım sayfası</h3>
    </div>
  );
}
