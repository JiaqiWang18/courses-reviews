import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import backend from "../apis/backend";
import { updateLogIn } from "../actions";
import { connect } from "react-redux";

const Logout = (props) => {
  const history = useHistory();

  useEffect(() => {
    logOut();
  });

  const logOut = async () => {
    await backend
      .post("logout/", {
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .catch((error) => {
        if (error.response) {
          history.push({
            pathname: "/",
            message: JSON.stringify(error.response.data),
          });
        }
      });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    backend.defaults.headers["Authorization"] = null;
    props.updateLogIn();
    history.push({
      pathname: "/",
      message: "Session has expired or you manually logged out.",
    });
  };
  return <div className="h4 text-center mt-5">Logging Out...</div>;
};

export default connect(null, { updateLogIn })(Logout);
