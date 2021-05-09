import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import { getPosted } from "../../actions/auth";

import Image from "../Images/Image/Image";

import decode from "jwt-decode";

const Profile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    dispatch(getPosted());
  }, [dispatch]);
  const images = useSelector((state) => state.images);

  return (
    <div>
      <h1>{user.result.name}</h1>
      <Button variant="contained" color="primary">
        Show saved
      </Button>
      {images.map((image) =>
        image.creatorId === user._id ? <Image image={image} /> : null
      )}
    </div>
  );
};

export default Profile;
