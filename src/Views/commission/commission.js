import { Route } from "react-router-dom";

import CommissionLinks from "./commission-links";

import StudentCrud from "./student-crud-view";
import Internship from './internship-view'

export default function Commission() {
  return (
    <div>
      <CommissionLinks />

      <Route path={"/commission/home"}>
        <Home />
      </Route>
      <Route path={"/commission/internship"}>
        <Internship />
      </Route>
      <Route path={"/commission/studentcrud"}>
        <StudentCrud />
      </Route>
      <Route path={"/commission/setting"}>
        <Setting />
      </Route>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Setting() {
  return (
    <div>
      <h2>setting</h2>
    </div>
  );
}


