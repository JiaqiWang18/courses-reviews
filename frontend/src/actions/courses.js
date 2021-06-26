import backend from "../apis/backend";
export const START_FETCH_COURSES = "START_FETCH_COURSES";
export const FETCH_COURSES = "FETCH_COURSES";
export const UPDATE_TERM = "UPDATE_TERM";
export const UPDATE_OP = "UPDATE_OP";

export const fetchCourses =
  (searchTerm = null, filterOp = "alpha") =>
  async (dispatch) => {
    dispatch({
      type: START_FETCH_COURSES,
    });
    let query = "/courses/";
    if (filterOp === "rating") {
      query += `?order=rating`;
    } else {
      query += `?order=alpha`;
    }
    if (searchTerm != null) {
      query += `&search=${searchTerm}`;
    }
    const response = await backend.get(query);
    dispatch({
      type: FETCH_COURSES,
      payload: {
        data: response.data,
        fetching: false,
        searchTerm: searchTerm,
        filterOp: filterOp,
      },
    });
  };

export const updateSearchTerm = (term) => {
  return {
    type: UPDATE_TERM,
    payload: { term: term },
  };
};

export const updateOp = (op) => {
  return {
    type: UPDATE_OP,
    payload: { op: op },
  };
};
