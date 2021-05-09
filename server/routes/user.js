import express from "express";

import { signin, signup, liked, posted } from "../controllers/user.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/liked", auth, liked);
router.get("/posted", auth, posted);

export default router;
