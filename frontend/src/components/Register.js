import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

import backend from "../apis/backend";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errRoot: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default () => {
  const classes = useStyles();
  let history = useHistory();
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  const renderedErrorMessages = Object.keys(errorMessages).map((key) => {
    return (
      <MuiAlert severity="error" elevation={3} key={key}>
        {key.replace("_", " ")}
        <ul>
          {errorMessages[key].map((mes) => (
            <li key={mes}>{mes}</li>
          ))}
        </ul>
      </MuiAlert>
    );
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const attemptRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await backend.post(`/register/`, formData);
      history.push({
        pathname: "/login",
        message: "You acccount has been created.",
      });
    } catch (err) {
      setErrorMessages(err.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.errRoot}>
              {renderedErrorMessages}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                onChange={handleInputChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleInputChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Retype Password"
                type="password"
                id="password2"
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              attemptRegister(e);
            }}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
