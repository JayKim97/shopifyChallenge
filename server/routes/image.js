import express from "express";
import {
  getImage,
  createImage,
  updateImage,
  deleteImage,
  likeImage,
  getSingleImage,
} from "../controllers/image.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getImage);
router.post("/", auth, createImage);
router.patch("/:id", auth, updateImage);
router.delete("/:id", auth, deleteImage);
router.patch("/:id/likeImage", auth, likeImage);
router.get("/images/:id", auth, getSingleImage);

// more features
// add to album

export default router;
