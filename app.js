const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const csrfProtection = csrf();

const app = express();
const port = 8000;
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));

// DB SET UP
const MONGODB_URI =
  "mongodb+srv://admin:tests@imgrepo.m7jjz.mongodb.net/myFirstDatabase";
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// session
app.use(
  session({
    secret: "SECRETKEY PLS REPLACE WITH ENV LATER DONT FORGET FUTURE ME",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

const User = require("./models/user");

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

// Routes
const imageRepositoryRoutes = require("./routes/imageRepository");
const authRoutes = require("./routes/auth");

app.use(imageRepositoryRoutes);
app.use(authRoutes);

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true })
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
