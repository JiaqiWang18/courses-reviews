import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { updateLogIn } from "../actions";
import { connect } from "react-redux";
import Logout from "./Logout";
import NotFound from "./NotFound";
import CommentList from "./CommentList";

const App = (props) => {
  useEffect(() => {
    props.updateLogIn();
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Home} />
        <Route path="/courses/:id" exact component={Home} />
        <Route path="/courses" exact component={Home} />
        <Route path="/ratings" exact component={CommentList} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default connect(null, { updateLogIn })(App);
