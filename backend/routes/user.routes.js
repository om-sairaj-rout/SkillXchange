const express = require("express");
const userRouter = express.Router();

const upload = require("../middlewares/multer.middleware");
const updateProfile = require("../controllers/userControllers/updateProfile.controllers");
const updateSkill = require("../controllers/userControllers/updateSkill.controllers");
const {searchLearner, searchTeacher} = require("../controllers/userControllers/searchUser.controllers");
const removeSkill = require("../controllers/userControllers/removeSkill.controllers");

userRouter.put("/update-Profile/:id", upload.single("profilePic"), updateProfile);
userRouter.put("/update-Skill/:id", updateSkill);
userRouter.put("/remove-Skill/:id", removeSkill);
userRouter.get("/search/learner", searchLearner);
userRouter.get("/search/teacher", searchTeacher);

module.exports = userRouter; 