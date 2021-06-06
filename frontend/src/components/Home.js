import React from "react";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import SideBar from "./SideBar";
import Search from "./Search";
import TopBar from "./TopBar";
import DropDown from "./Dropdown";
import CourseList from "./CourseList";
import { connect } from "react-redux";

const sortOptions = [
  {
    label: "Alphabetical",
    value: "alpha",
  },
  {
    label: "Ratings",
    value: "rating",
  },
];

const Home = (props) => {
  return (
    <>
      <TopBar />
      <div className="bg-white py-3 shadow-sm mb-2 sticky">
        <div className="desktop-width mx-auto d-flex flex-row">
          <Search />
          <DropDown options={sortOptions} />

          <div className={`ml-auto`}>
            {props.loggedIn ? (
              <a
                className="btn btn-outline-danger"
                href="/logout"
                role="button"
              >
                Log out
              </a>
            ) : (
              <>
                <a
                  className="btn btn-outline-primary mr-1"
                  href="/login"
                  role="button"
                >
                  Log In
                </a>
                <a
                  className="btn btn-outline-danger"
                  href="/register"
                  role="button"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-8">
            <Grid item xs={12}>
              {props.location.message !== undefined ? (
                <Alert severity="success" elevation={3}>
                  {props.location.message}
                </Alert>
              ) : null}
              <CourseList openId={props.match.params.id} />
            </Grid>
          </div>
          <div className="col-md">
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps)(Home);
