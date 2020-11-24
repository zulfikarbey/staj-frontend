import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Mal from "./Views/mal";
import Settings from "./Views/settings";
import LoginPage from "./Views/log-in";

const studentSubRoute = [
  { path: "/student", exact: true, component: Student },
  { path: "/student/settings", component: Settings },
  { path: "/student/mal", component: Mal },
];

const commissionSubRoute = [
  { path: "/commission", exact: true, component: Commission },
  { path: "/commission/settings", component: Settings },
  { path: "/commission/mal", component: Mal },
];

export default function App() {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <Main />
        </Route>

        {auth.isLogin ? (
          auth.isCommission ? (
            commissionSubRoute.map((route, i) => (
              <RouteCreator key={i} {...route} />
            ))
          ) : (
            studentSubRoute.map((route, i) => (
              <RouteCreator key={i} {...route} />
            ))
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

function RouteCreator(route) {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

function Commission() {
  const dispatch = useDispatch();

  return (
    <div>
      <Link to="/">main</Link>
      <Link to="/commission/settings">ayarlar</Link>
      <Link to="/" onClick={() => dispatch({ type: "LOG_OUT" })}>
        ÇIKIŞ YAPIYORUM
      </Link>

      <h3>komisyon sayfası</h3>
    </div>
  );
}

function Student() {
  const dispatch = useDispatch();
  return (
    <div>
      <Link to="/">main</Link>
      <Link to="/student/settings">ayarlar</Link>
      <Link to="/" onClick={() => dispatch({ type: "LOG_OUT" })}>
        Çıkış yapıyoruz
      </Link>
      <h3>Öğrenciler sayfası</h3>
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

function Main() {
  return (
    <div>
      <h1>mainpage</h1>

      <Link to={"/login"}>login</Link>
      <br />
      <br />
      <Link to={"/student"}>öğrenciler</Link>
      <br />
      <Link to={"/commission"}>komisyon</Link>
      <Settings />
      <Mal />
    </div>
  );
}
