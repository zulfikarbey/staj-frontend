import { Route } from "react-router-dom";


import HomeView from './home-view'
import StundentLinks from "./student-links";

export default function Student() {
  return (
    <div>
      <StundentLinks />

      <Route path={"/student/home"}>
        <HomeView />
      </Route>
      <Route path={"/student/about"}>
        <About />
      </Route>
      <Route path={"/student/setting"}>
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
function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}
