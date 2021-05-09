import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import imageRoutes from "./routes/image.js";
import userRouter from "./routes/user.js";

//app set up
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

// ROUTES
app.use("/images", imageRoutes);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("SHOPIFY IMAGE REP API");
});

// MONGODB

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`BACKEND SERVER RUNNING ON PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

mongoose.set("useFindAndModify", false);
