import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grow, Paper, Card, CardMedia, Button } from "@material-ui/core";
import makeStyles from "./styles";

const ImageDetail = ({ currentId, setCurrentId }) => {
  const classes = makeStyles();
  const [imageData, setImageData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const image = useSelector((state) =>
    currentId ? state.images.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (image) setImageData(image);
  }, [image]);

  const downloader = () => {
    var a = document.createElement("a");
    a.href = image.selectedFile;
    a.download = image.title;
    a.click();
  };

  return (
    <Grow in>
      <Paper className={classes.paper}>
        <Card className={classes.Card}>
          <CardMedia className={classes.Media} image={image.selectedFile} />
        </Card>
        <div className={classes.Button}>
          <Button
            className={classes.bottom}
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            onClick={downloader}
          >
            Download
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setCurrentId(0)}
            fullWidth
          >
            Cancel
          </Button>
        </div>
      </Paper>
    </Grow>
  );
};

export default ImageDetail;
