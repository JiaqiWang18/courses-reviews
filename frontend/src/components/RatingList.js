import React, { useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import { connect } from "react-redux";
import Loader from "./Loader";
import { fetchRatings } from "../actions";

const RatingList = (props) => {
  useEffect(() => {
    props.fetchRatings(props.courseId);
  }, []);

  const renderedRatingList = props.ratings.map((ratingObj) => {
    return (
      <div className="card mb-2 rating-card" key={ratingObj.id}>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h6 className="card-subtitle mb-2">
                {ratingObj.first_name} {ratingObj.last_name}
              </h6>
            </div>
            <div className="col d-flex justify-content-end pt-2">
              <Rating
                name="read-only"
                precision={0.5}
                value={parseFloat(ratingObj.student_rating)}
                readOnly
                size="small"
              />
            </div>
          </div>
          <p className="card-text">{ratingObj.comment}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      {props.fetching ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex flex-column">
            {renderedRatingList.length === 0 ? (
              <p className="h6 text-muted text-center mt-3">No ratings found</p>
            ) : (
              renderedRatingList
            )}
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { ratings: state.ratings.data, fetching: state.ratings.fetching };
};

export default connect(mapStateToProps, { fetchRatings })(RatingList);
