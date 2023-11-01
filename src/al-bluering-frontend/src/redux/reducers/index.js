import { combineReducers } from "redux";
import curTag from "./curTag";
import curModule from "./module";
import curHeader from "./header";
import curCoach from "./curCoach";

// all reducers
export default combineReducers({
  // key : state
  curTag: curTag,
  curModule: curModule,
  curHeader: curHeader,
  curCoach: curCoach,
});
