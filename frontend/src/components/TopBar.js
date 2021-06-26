import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import useOnScreen from "../hooks/useOnScreen";

const TopBar = (props) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  useEffect(() => {
    props.setisTopBarOnScreen(isVisible);
  }, [isVisible]);

  return (
    <div className="bg-gradient hero d-flex flex-column" ref={ref}>
      <div className="container d-flex flex-row-reverse">
        <a className="btn btn-muted text-white" href="/api" role="button">
          <div className="h6 mt-2">API doc</div>
        </a>
      </div>
      <div className="container my-auto">
        <div className="d-flex flex-row">
          <h1 className="display-4 text-white font-weight-bold">
            Course Reviews
          </h1>
          <i className="fas fa-comment-dots text-white fa-2x"></i>
        </div>
        <p className="lead text-white">Rate Your Courses</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps)(TopBar);
