import { combineReducers } from "redux";
import auth from "./auth";
import counter from "./counter";
import studentlist from "./StudentList/reducer";
import internshiplist from "./InternshipList/reducer";

export default combineReducers({
  auth,
  counter,
  studentlist,
  internshiplist
});
