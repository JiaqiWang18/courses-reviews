import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import backend from "../apis/backend";
import { useHistory } from "react-router-dom";
import { fetchCourses } from "../actions";

const RatingForm = (props) => {
  const [rating, setRating] = React.useState(null);
  const [comment, setComment] = React.useState("");
  let history = useHistory();

  React.useEffect(() => {
    setRating(null);
    setComment("");
  }, [props.open]);

  const handleSubmit = async () => {
    const response = await backend.post(`/ratings/`, {
      student_rating: rating,
      comment: comment,
      course: props.courseId,
    });
    props.handleClose();
    props.fetchCourses();
    history.push({
      pathname: "/courses/" + props.courseId,
      message: "Your rating submitted successfully.",
    });
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        Submit a rating for {props.courseTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Please leave some comments</DialogContentText>
        <TextField
          id="outlined-textarea"
          label="Write some comments"
          className="mb-2"
          placeholder="Comments"
          multiline
          variant="outlined"
          fullWidth
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <DialogContentText>Drag the stars to rate</DialogContentText>
        <Rating
          name="simple-controlled"
          precision={0.5}
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(null, { fetchCourses })(RatingForm);
