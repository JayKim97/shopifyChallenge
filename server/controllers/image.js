import mongoose from "mongoose";
import Image from "../models/image.js";
import User from "../models/user.js";

export const getImage = async (req, res) => {
  try {
    const image = await Image.find();
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createImage = async (req, res) => {
  const image = req.body;
  const newImage = new Image({
    ...image,
    creatorId: req.userId,
    createAt: new Date().toString(),
  });

  // const user = await User.findById(newImage.creatorId);

  try {
    // const image = await newImage.save();
    // user.posted.push(image._id);
    // await User.findByIdAndUpdate(user._id, user, { new: true });
    res.status(201).json(newImage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateImage = async (req, res) => {
  const { id: _id } = req.params;
  const image = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("no image with that id");
  }

  const updatedImage = await Image.findByIdAndUpdate(
    _id,
    { ...image, _id },
    { new: true }
  );
  res.json(updatedImage);
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Image with that id");
  // const imgId = id;
  // const img = await Image.findById(id);
  // const user = await User.findById(img.creatorId);
  // user.posted = user.posted.filter((id) => id !== String(imgId));
  // await User.findByIdAndUpdate(user._id, user, { new: true });

  await Image.findByIdAndRemove(id);
  console.log("DELETE");
  res.json({ message: "Image deleted successfully" });
};

export const likeImage = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("no image with that id");
  }
  const image = await Image.findById(id);
  // const user = await User.findById(req.userId);

  const index = image.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    image.likes.push(req.userId);
    // user.liked.push(image._id);
  } else {
    image.likes = image.likes.filter((id) => id !== String(req.userId));
    // user.liked = user.liked.filter((id) => id !== String(image._id));
  }

  const updatedImage = await Image.findByIdAndUpdate(id, image, { new: true });
  // await User.findByIdAndUpdate(user._id, user, { new: true });
  res.json(updatedImage);
};

export const getSingleImage = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("no image with that id");
  }
  const image = await Image.findById(id);
  res.status(200).json(image);
};
