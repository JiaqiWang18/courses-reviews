import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import backend from "../apis/backend";
import ProfileDropDown from "./ProfileDropDown";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {},
});

const CommentList = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      history.push({
        pathname: "/login",
        message: "Please log in to see submitted ratings",
      });
      return;
    }
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await backend.get(`/ratings/`).catch((e) => alert(e));
    setCommentList(response.data);
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
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  ));

  return (
    <>
      <div className={`bg-white py-3 shadow-sm sticky`}>
        <div className={`container-fluid mx-auto d-flex flex-row`}>
          <div className="text-lead" style={{ fontSize: "1.5em" }}>
            My Ratings
          </div>
          <div className={`ml-auto ml-2`}>
            <ProfileDropDown />
          </div>
        </div>
      </div>
      <div className="container my-5">
        {renderedCommentList.length === 0 ? (
          <p className="h5 text-muted text-center mt-5">
            You haven't made any reviews yet
          </p>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderedCommentList}</TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
};

export default connect()(CommentList);
