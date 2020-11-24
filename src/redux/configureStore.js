import { createStore } from "redux";
import reducer from "./Modules/index";

export const store = createStore(reducer);
