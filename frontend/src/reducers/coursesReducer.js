import {
  START_FETCH_COURSES,
  FETCH_COURSES,
  UPDATE_OP,
  UPDATE_TERM,
} from "../actions";

export default (
  state = { data: [], fetching: false, searchTerm: null, filterOp: "alpha" },
  action
) => {
  switch (action.type) {
    case FETCH_COURSES:
      return {
        data: action.payload.data,
        fetching: false,
        searchTerm: action.payload.searchTerm,
        filterOp: action.payload.filterOp,
      };
    case START_FETCH_COURSES:
      return {
        ...state,
        fetching: true,
      };
    case UPDATE_OP:
      return {
        ...state,
        filterOp: action.payload.op,
      };
    case UPDATE_TERM:
      return {
        ...state,
        searchTerm: action.payload.term,
      };
    default:
      return state;
  }
};
