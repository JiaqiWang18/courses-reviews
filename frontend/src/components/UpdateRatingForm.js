import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import backend from "../apis/backend";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const UpdateRatingForm = (props) => {
  const [rating, setRating] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [errorMessages, setErrorMessages] = React.useState({});

  let history = useHistory();

  React.useEffect(() => {
    if (props.ratingId) {
      fetchOriginal();
    }
  }, [props.open]);

  const fetchOriginal = async () => {
    const { data } = await backend
      .get(`/ratings/${props.ratingId}/`)
      .catch((e) => alert(e));
    setRating(parseFloat(data.student_rating));
    setComment(data.comment);
  };
  const handleSubmit = () => {
    backend
      .patch(`/ratings/${props.ratingId}/`, {
        student_rating: rating,
        comment: comment,
        id: props.ratingId,
      })
      .then((res) => {
        props.handleClose();
        history.push({
          pathname: "/ratings",
          message: (
            <Alert severity="success" className="my-2">
              {`Your review for ${props.courseName} was updated successfully`}
            </Alert>
          ),
        });
      })
      .catch((e) => setErrorMessages(e.response.data));
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
        Update your review for <b>{props.courseName}</b>
      </DialogTitle>
      <DialogContent>
        <Grid item xs={12}>
          {renderedErrorMessages}
        </Grid>
        <DialogContentText>Your comment</DialogContentText>
        <TextField
          id="outlined-textarea"
          className="mb-2"
          placeholder="Comments"
          multiline
          variant="outlined"
          fullWidth
          onChange={(event) => {
            setComment(event.target.value);
          }}
          value={comment}
        />
        <DialogContentText>Your rating</DialogContentText>
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
        <Button onClick={handleSubmit} color="secondary">
          Update
        </Button>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(null)(UpdateRatingForm);
