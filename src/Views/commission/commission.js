import { Route } from "react-router-dom";

import CommissionLinks from "./commission-links";

import StudentCrud from "./student-crud-view";
import Internship from "./internship-view";
import Home from "./commission-home-view";

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
    </div>
  );
}
