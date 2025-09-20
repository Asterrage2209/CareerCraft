const express = require("express");
const { getCareerAdvice, getChatHistory, createNewSession } = require("../controller/consultancy.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.post("/session", createNewSession);

router.post("/advice", getCareerAdvice);

router.get("/history/:sessionId", getChatHistory);

module.exports = router;
