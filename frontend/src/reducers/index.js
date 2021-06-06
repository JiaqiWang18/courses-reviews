import { combineReducers } from "redux";
import authReducer from "./authReducer";
import coursesReducer from "./coursesReducer";
import ratingsReducers from "./ratingsReducers";

export default combineReducers({
  auth: authReducer,
  courses: coursesReducer,
  ratings: ratingsReducers,
});
