const Image = require("../models/image");
const mongoose = require("mongoose");

exports.getIndex = (req, res, next) => {
  Image.find().then((images) => {
    res.render("imageRepository/index", {
      path: "/",
      pageTitle: "Image Repository",
      imgs: images,
    });
  });
};

exports.getAddImage = (req, res, next) => {
  res.render("imageRepository/addImage", {
    path: "/",
    pageTitle: "Add Image",
  });
};

exports.postAddImage = (req, res, next) => {
  const img = req.file;
  if (!img) {
    console.log("Image not processed");
    return;
  }
  const image = new Image({
    imageURL: img.path,
    userId: req.user._id,
  });
  image.save();
};

exports.deleteImage = (req, res, next) => {
  const imageId = req.body.imageId;
  console.log(imageId);
  console.log(req.user._id);
  Image.deleteOne({ _id: imageId, userId: req.user._id }).then(() => {
    console.log("Image Deleted");
    res.redirect("/");
  });
};

exports.getImage = (req, res, next) => {
  const imgId = req.params.image_id;
  Image.findById(imgId).then((image) => {
    res.render("imageRepository/image-detail", {
      pageTitle: "Image Detail",
      image: image,
      userId: image.userId,
    });
  });
};
