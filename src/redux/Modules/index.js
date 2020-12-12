import { combineReducers } from "redux";
import auth from "./auth";
import counter from "./counter";
import studentlist from './studentlist'

export default combineReducers({
  auth,
  counter,
  studentlist
});
