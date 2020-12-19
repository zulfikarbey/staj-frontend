import { Route } from "react-router-dom";

import HomeView from "./home-view";
import StundentLinks from "./student-links";

export default function Student() {
  return (
    <div>
      <StundentLinks />

      <Route path={"/student/home"}>
        <HomeView />
      </Route>
    </div>
  );
}
