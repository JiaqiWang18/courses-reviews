export const UPDATE_LOGIN = "UPDATE_LOGIN";

export const updateLogIn = () => {
  if (localStorage.getItem("access_token") !== null) {
    return {
      type: UPDATE_LOGIN,
      payload: true,
    };
  } else {
    return {
      type: UPDATE_LOGIN,
      payload: false,
    };
  }
};
