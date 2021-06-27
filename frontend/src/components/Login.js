import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateLogIn } from "../actions";
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
    marginTop: theme.spacing(1),
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

const Login = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      history.push({
        pathname: "/",
        message: "You are logged in.",
      });
    }
  }, []);

  const renderedErrorMessages = Object.keys(errorMessages).map((key) => {
    return (
      <Alert severity="error" elevation={3} key={key}>
        {key === "detail"
          ? "Error"
          : key.charAt(0).toUpperCase() + key.slice(1)}
        <li>{errorMessages[key]}</li>
      </Alert>
    );
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const attemptLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await backend.post("/token/", formData);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      backend.defaults.headers[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("access_token")}`;
      props.updateLogIn();
      history.push({
        pathname: "/",
        message: "You are logged in.",
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Grid item xs={12}>
            {props.location.message !== undefined ? (
              <Alert severity="success" elevation={3}>
                {props.location.message}
              </Alert>
            ) : null}
          </Grid>
          <Grid item xs={12} className={classes.errRoot}>
            {renderedErrorMessages}
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              attemptLogin(e);
            }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register/" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default connect(null, {
  updateLogIn,
})(Login);
