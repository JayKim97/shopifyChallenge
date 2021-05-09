import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grow,
  Avatar,
} from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import { createImage, updateImage } from "../../actions/images";

const Form = ({ currentId, setCurrentId, setEditPic }) => {
  const [imageData, setImageData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  console.log(currentId);
  const image = useSelector((state) =>
    currentId ? state.images.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (image) setImageData(image);
  }, [image]);

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const setBoth = () => {
    setCurrentId(0);
    setEditPic(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updateImage(currentId, {
          ...imageData,
          creatorName: user?.result?.name,
        })
      );
    } else {
      dispatch(createImage({ ...imageData, creatorName: user?.result?.name }));
    }
    history.push("/");
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }

  const clear = () => {
    setImageData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Grow in>
      <Paper className={classes.paper}>
        <form
          autoComplete="pff"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? "Editing" : "Creating"} Image
          </Typography>

          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={imageData.title}
            onChange={(e) =>
              setImageData({ ...imageData, title: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={imageData.tags}
            onChange={(e) =>
              setImageData({ ...imageData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              value={imageData.selectedFile}
              onDone={({ base64 }) =>
                setImageData({ ...imageData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          {image === null ? (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={clear}
              fullWidth
            >
              Clear
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={setBoth}
              fullWidth
            >
              Cancel
            </Button>
          )}
        </form>
      </Paper>
    </Grow>
  );
};

export default Form;
