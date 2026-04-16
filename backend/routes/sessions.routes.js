const express = require("express");
const router = express.Router();
const confirmSessionCompletion = require("../controllers/sessionsControllers/sessions.controllers");

router.patch("/confirm/:sessionId/:userId", confirmSessionCompletion);

module.exports = router;