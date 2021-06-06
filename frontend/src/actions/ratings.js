import backend from "../apis/backend";
export const START_FETCH_RATINGS = "START_FETCH_RATINGS";
export const FETCH_RATINGS = "FETCH_RATINGS";

export const fetchRatings = (courseId) => async (dispatch) => {
  dispatch({
    type: START_FETCH_RATINGS,
  });
  const response = await backend.get(`/home-rating-list/?course=${courseId}`);
  dispatch({
    type: FETCH_RATINGS,
    payload: { data: response.data, fetching: false, course: courseId },
  });
};
