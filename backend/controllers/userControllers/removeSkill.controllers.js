const user = require("../../models/user.model");

const removeSkill = async (req, res) => {
  const userId = req.params.id;
  const { skillName , isTeach } = req.body;

  try {
    const userToUpdate = await user.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (isTeach) {
      // Remove from skillsTeach
      userToUpdate.skillsTeach = userToUpdate.skillsTeach.filter(
        (skill) => skill.name !== skillName
      );
    } else {
      // Remove from skillsLearn
      userToUpdate.skillsLearn = userToUpdate.skillsLearn.filter(
        (skill) => skill.name !== skillName
      );
    }

    await userToUpdate.save();

    res
      .status(200)
      .json({ message: "Skills updated successfully", user: userToUpdate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = removeSkill;
