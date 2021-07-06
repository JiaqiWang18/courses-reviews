import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import SideBar from "./SideBar";
import Search from "./Search";
import TopBar from "./TopBar";
import DropDown from "./Dropdown";
import CourseList from "./CourseList";
import { connect } from "react-redux";
import ProfileDropDown from "./ProfileDropDown";

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
  const [isTopBarOnScreen, setisTopBarOnScreen] = useState(true);
  const containerWidth = isTopBarOnScreen
    ? "container"
    : "container-fluid w-90";
  return (
    <>
      <TopBar setisTopBarOnScreen={setisTopBarOnScreen} />
      <div className={`bg-white py-3 shadow-sm mb-2 sticky`}>
        <div className={`${containerWidth} mx-auto d-flex flex-row`}>
          {!isTopBarOnScreen && (
            <div className="d-flex flex-row mr-3">
              <div className="text-lead" style={{ fontSize: "1.5em" }}>
                Courses Reviews
              </div>
              <i class="fas fa-comment-dots"></i>
            </div>
          )}
          <div className="row">
            <div className="col-md">
              <Search />
            </div>
            <div className="col">
              <DropDown options={sortOptions} />
            </div>
          </div>
          <div className={`ml-auto ml-2`}>
            {props.loggedIn ? (
              <ProfileDropDown />
            ) : (
              <a
                className="btn btn-outline-danger"
                href="/ratings/"
                role="button"
              >
                Log In
              </a>
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
