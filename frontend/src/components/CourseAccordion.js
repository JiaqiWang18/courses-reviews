import React, { useEffect, useState, useRef } from "react";
import Rating from "@material-ui/lab/Rating";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import RatingList from "./RatingList";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import RatingForm from "./RatingForm";
import { useHistory } from "react-router-dom";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, 0.125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .01)",
    margin: 0,
  },
}))(MuiAccordionDetails);

const CourseAccordion = ({
  courseObj,
  key,
  handleExpandChange,
  expandedId,
}) => {
  const ref = useRef();
  let history = useHistory();
  const [formOpen, setFormOpen] = useState(false);
  useEffect(() => {
    if (expandedId == courseObj.id) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [expandedId]);
  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current && ref.current.contains(event.target)) return;
      //history.push("/");
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });
    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormOpen = () => {
    if (localStorage.getItem("access_token")) setFormOpen(true);
    else {
      history.push({
        pathname: "/login/",
        message: "Please log in or register first.",
      });
    }
  };

  return (
    <div className="mb-2 mt-1" key={key} ref={ref}>
      <RatingForm
        open={formOpen}
        handleClose={handleFormClose}
        courseTitle={courseObj.title}
        courseId={courseObj.id}
      />
      <Accordion
        square
        expanded={expandedId == courseObj.id}
        onChange={() => handleExpandChange(courseObj.id)}
        className={expandedId != courseObj.id && `course-accordion`}
      >
        <AccordionSummary>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h5 className="card-title">{courseObj.title}</h5>
                <h6 className="card-subtitle text-muted">
                  {`${courseObj.instructor_first_name} ${courseObj.instructor_last_name}`}
                </h6>
              </div>
              <div className="col d-flex justify-content-end pt-2">
                {courseObj.avg_rating !== null ? (
                  <Rating
                    name="read-only"
                    precision={0.5}
                    value={parseFloat(courseObj.avg_rating)}
                    readOnly
                  />
                ) : null}
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="card-body">
            <div className="h3 lead text-muted">Course Description</div>
            <div className="row">
              <div className="col-9">
                <div className="p">{courseObj.course_detail}</div>
              </div>
              <div className="col d-flex flex-row justify-content-end mr-2">
                <Fab
                  color="secondary"
                  aria-label="edit"
                  size="small"
                  onClick={handleFormOpen}
                >
                  <EditIcon />
                </Fab>
              </div>
            </div>
            <div className="h3 lead text-muted mt-3">Student Reviews</div>
            {expandedId == courseObj.id ? (
              <RatingList courseId={courseObj.id} />
            ) : null}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default connect(null)(CourseAccordion);
