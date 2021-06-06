import React from "react";
import { connect } from "react-redux";

const TopBar = (props) => {
  return (
    <div className="bg-gradient hero d-flex flex-column">
      <div className="container d-flex flex-row-reverse">
        <a className="btn btn-muted text-white" href="/api" role="button">
          <div className="h6 mt-2">API doc</div>
        </a>
      </div>
      <div className="container my-auto">
        <h1 className="display-4 text-white font-weight-bold">Course Review</h1>
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
