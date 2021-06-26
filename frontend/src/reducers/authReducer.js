import { UPDATE_LOGIN } from "../actions";

export default (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case UPDATE_LOGIN:
      return { loggedIn: action.payload };
    default:
      return state;
  }
};
