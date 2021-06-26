import { START_FETCH_RATINGS, FETCH_RATINGS } from "../actions";

export default (
  state = { data: [], fetching: false, course: null },
  action
) => {
  switch (action.type) {
    case FETCH_RATINGS:
      return {
        data: action.payload.data,
        course: action.payload.course,
        fetching: false,
      };
    case START_FETCH_RATINGS:
      return {
        ...state,
        fetching: true,
      };
    default:
      return state;
  }
};
