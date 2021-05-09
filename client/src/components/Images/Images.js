import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Image from "./Image/Image";
import useStyles from "./styles";

const Images = ({ setCurrentId, setEditPic }) => {
  const classes = useStyles();
  const images = useSelector((state) => state.images);
  return !images.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {images.map((image) => (
        <Grid key={image._id} item xs={12} sm={3}>
          <Image
            image={image}
            setCurrentId={setCurrentId}
            setEditPic={setEditPic}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default Images;
