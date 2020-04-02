import { combineReducers } from "redux";
import itemReducer from "./ItemReducer";

export default combineReducers({
  item: itemReducer
});
