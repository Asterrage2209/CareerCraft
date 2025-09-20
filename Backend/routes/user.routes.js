const express = require("express");
const { login, signup, getUserProfile, updateUserProfile } = require("../controller/user.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, updateUserProfile);

module.exports = router;
