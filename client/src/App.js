import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Form from "./components/Form/Form";
import Profile from "./components/Profile/Profile";

import { getImages } from "./actions/images";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/CreateImage" exact component={Form} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
