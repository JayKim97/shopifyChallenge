import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardMedia,
  CardActionArea,
  Button,
  Typography,
  Checkbox,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import useStyle from "./styles";
import { deleteImages, likeImages } from "../../../actions/images";

const Image = ({ image, setCurrentId, setEditPic }) => {
  const currentId = image._id;
  const dispatch = useDispatch();
  const classes = useStyle();
  const user = JSON.parse(localStorage.getItem("profile"));
  const setBoth = () => {
    console.log("SET BOTH");
    setCurrentId(image._id);
    setEditPic(true);
  };

  const downloader = () => {
    var a = document.createElement("a");
    a.href = image.selectedFile;
    a.download = image.title;
    a.click();
  };
  const Likes = () => {
    if (image.likes.length > 0) {
      return image.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {image.likes.length > 2
            ? `You and ${image.likes.length - 1} others`
            : `${image.likes.length} like${image.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{image.likes.length}{" "}
          {image.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => setCurrentId(image._id)}>
        <CardMedia
          className={classes.media}
          image={image.selectedFile}
          title={image.name}
        />
      </CardActionArea>
      <div className={classes.overlay}>
        <Typography variant="h6">{image.name}</Typography>
        <Typography variant="body2">
          {moment(image.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === image?.creatorId ||
        user?.result?._id === image?.creatorId) && (
        <div className={classes.overlay2}>
          <Button style={{ color: "black" }} size="small" onClick={setBoth}>
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {image.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {image.title}
      </Typography>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likeImages(image._id))}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === image?.creatorId ||
          user?.result?._id === image?.creatorId) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deleteImages(image._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>

      <Button
        variant="contained"
        color="primary"
        size="small"
        fullWidth
        onClick={downloader}
      >
        Download
      </Button>
    </Card>
  );
};

export default Image;
