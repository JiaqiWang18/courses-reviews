import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import backend from "../apis/backend";
import UpdateRatingForm from "./UpdateRatingForm";
import ProfileDropDown from "./ProfileDropDown";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  table: {},
});

const UserRatingList = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [commentList, setCommentList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [checkOutRating, setCheckOutRating] = useState({});
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      history.push({
        pathname: "/login/",
        message: "Please log in to see submitted ratings",
      });
      return;
    }
    fetchComments();
  }, []);

  useEffect(() => {
    if (props.location.message)
      setMessageList([...messageList, props.location.message]);
  }, [props.location.message]);

  const fetchComments = () => {
    backend
      .get(`/ratings/`)
      .then((res) => setCommentList(res.data))
      .catch((e) => {
        setMessageList([
          ...messageList,
          <Alert severity="error" className="my-2">
            {e.response.statusText}
          </Alert>,
        ]);
      });
  };

  const handleUpdateFormClose = () => {
    setOpenUpdateForm(false);
    fetchComments();
  };

  const handleDeleteButtonClick = (checkOutRating) => {
    backend
      .delete(`/ratings/${checkOutRating.id}/`)
      .then((res) => {
        setMessageList([
          ...messageList,
          <Alert severity="success" className="my-2">
            Your review for {checkOutRating.course_name} has been deleted
          </Alert>,
        ]);
        fetchComments();
      })
      .catch((e) => {
        setMessageList([
          ...messageList,
          <Alert severity="error" className="my-2">
            {e.response.statusText}
          </Alert>,
        ]);
      });
    setOpenDeleteDialog(false);
  };

  const renderedCommentList = commentList.map((commentObj) => (
    <TableRow key={commentObj.id}>
      <TableCell component="th" scope="row">
        {commentObj.course_name}
      </TableCell>
      <TableCell>{commentObj.comment}</TableCell>
      <TableCell>
        <Rating
          name="read-only"
          precision={0.5}
          value={parseFloat(commentObj.student_rating)}
          readOnly
          size="small"
        />
      </TableCell>
      <TableCell>
        <Button
          color="primary"
          onClick={() => {
            setCheckOutRating(commentObj);
            setOpenUpdateForm(true);
          }}
        >
          <i class="far fa-edit fa-lg"></i>
        </Button>
      </TableCell>
      <TableCell>
        <Button
          color="secondary"
          onClick={() => {
            setCheckOutRating(commentObj);
            setOpenDeleteDialog(true);
          }}
        >
          <i class="far fa-trash-alt fa-lg"></i>
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <div className={`bg-white py-3 shadow-sm sticky`}>
        <div className={`container-fluid mx-auto d-flex flex-row`}>
          <div className="d-flex flex-row mr-3">
            <div
              className="text-lead nav-logo nav-text"
              style={{ fontSize: "1.5em" }}
              onClick={() => history.push("/")}
            >
              Course Reviews
            </div>
            <i class="fas fa-comment-dots"></i>
          </div>
          <div className={`ml-auto ml-2`}>
            <ProfileDropDown />
          </div>
        </div>
      </div>
      <div className="container my-3">
        <div className="h5 text-muted">My Reviews</div>
        {messageList}
        {renderedCommentList.length === 0 ? (
          <p className="h5 text-muted text-center mt-5">
            You haven't made any reviews yet
          </p>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>{renderedCommentList}</TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete review?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your comment and star rating for{" "}
              <b>{checkOutRating.course_name}</b> will be deleted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleDeleteButtonClick(checkOutRating)}
              color="secondary"
            >
              Delete
            </Button>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              color="primary"
              autoFocus
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <UpdateRatingForm
        open={openUpdateForm}
        handleClose={handleUpdateFormClose}
        courseName={checkOutRating.course_name}
        ratingId={checkOutRating.id}
      />
    </>
  );
};

export default connect()(UserRatingList);
