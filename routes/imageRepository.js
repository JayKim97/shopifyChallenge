const path = require("path");
const express = require("express");
const repositoryController = require("../controllers/imageRepository");
const router = express.Router();

const isAuth = require("../middleware/is-auth");

router.get("/", repositoryController.getIndex);

router.get("/addImage", isAuth, repositoryController.getAddImage);
router.post("/addImage", repositoryController.postAddImage);

// router.get("/EditImage", repositoryController.getEditImage);
// router.post("/EditImage", repositoryController.postEditImage);

router.get("/image/:image_id", repositoryController.getImage);

router.post("/deleteImage", isAuth, repositoryController.deleteImage);
module.exports = router;
