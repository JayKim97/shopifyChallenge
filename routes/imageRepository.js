const path = require("path");
const express = require("express");
const repositoryController = require("../controllers/imageRepository");
const router = express.Router();

router.get("/", repositoryController.getIndex);

module.exports = router;
