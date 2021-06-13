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
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";

const RatingForm = (props) => {
  const [rating, setRating] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [errorMessages, setErrorMessages] = React.useState({});

  let history = useHistory();

  React.useEffect(() => {
    setRating(null);
    setComment("");
  }, [props.open]);

  const handleSubmit = () => {
    backend
      .post(`/ratings/`, {
        student_rating: rating,
        comment: comment,
        course: props.courseId,
      })
      .then((res) => {
        props.handleClose();
        props.fetchCourses();
        history.push({
          pathname: "/courses/" + props.courseId,
          message: "Your rating was submitted successfully.",
        });
      })
      .catch((e) => {
        setErrorMessages(e.response.data);
      });
  };

  const renderedErrorMessages = Object.keys(errorMessages).map((key) => {
    return (
      <Alert severity="error" elevation={3} key={key} className="mb-2">
        {key === "student_rating"
          ? "Stars"
          : key.charAt(0).toUpperCase() + key.slice(1)}
        <li>{errorMessages[key]}</li>
      </Alert>
    );
  });

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        Submit a rating for <b>{props.courseTitle}</b>
      </DialogTitle>
      <DialogContent>
        <Grid item xs={12}>
          {renderedErrorMessages}
        </Grid>
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
