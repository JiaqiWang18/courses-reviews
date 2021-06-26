import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
import { fetchCourses } from "../actions";
import CourseAccordion from "./CourseAccordion";
import { useHistory } from "react-router-dom";

const CourseList = (props) => {
  const [expanded, setExpanded] = useState(null);

  let history = useHistory();
  const handleExpandChange = (expandId) => {
    if (expandId == expanded) {
      history.push({
        pathname: "/",
      });
      setExpanded(null);
    } else {
      history.push({
        pathname: "/courses/" + expandId,
      });
      setExpanded(expandId);
    }
  };

  useEffect(() => {
    props.fetchCourses(props.searchTerm, props.filterOp);
    setExpanded(props.openId);
  }, [props.searchTerm, props.filterOp]);

  const renderedCourseList = props.courses.map((courseObj) => (
    <CourseAccordion
      courseObj={courseObj}
      key={courseObj.id}
      handleExpandChange={handleExpandChange}
      expandedId={expanded}
    />
  ));

  return (
    <>
      {props.fetching ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex flex-column">
            {renderedCourseList.length === 0 ? (
              <p className="h5 text-muted text-center mt-5">No course found</p>
            ) : (
              renderedCourseList
            )}
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses.data,
    fetching: state.courses.fetching,
    searchTerm: state.courses.searchTerm,
    filterOp: state.courses.filterOp,
  };
};

export default connect(mapStateToProps, { fetchCourses })(CourseList);
