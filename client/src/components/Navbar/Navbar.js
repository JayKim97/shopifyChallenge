import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="Static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h5"
          align="center"
          height="60"
        >
          Shopify Challenge
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            {/* <Button
              variant="contained"
              color="pirmary"
              component={Link}
              to="/profile"
            >
              profile
            </Button> */}
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/CreateImage"
            >
              post image
            </Button>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            SIGN IN
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
