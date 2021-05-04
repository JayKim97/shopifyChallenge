exports.getIndex = (req, res, next) => {
  res.render("imageRepository/index", {
    path: "/",
    pageTitle: "Image Repository",
  });
};
