const user = require("../../models/user.model");

const updateSkill = async (req, res) => {
  const userId = req.params.id;
  const { skillsLearn, skillsTeach } = req.body;

  try {
    const userToUpdate = await user.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (skillsLearn && Array.isArray(skillsLearn)) {
      skillsLearn.forEach(skill => {
        if (!userToUpdate.skillsLearn.includes(skill)) {
          userToUpdate.skillsLearn.push(skill);
        }
      });
    }

    if (skillsTeach && Array.isArray(skillsTeach)) {
      skillsTeach.forEach(skill => {
        if (!userToUpdate.skillsTeach.includes(skill)) {
          userToUpdate.skillsTeach.push(skill);
        }
      });
    }
    await userToUpdate.save();

    res
      .status(200)
      .json({ message: "Skills updated successfully", user: userToUpdate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = updateSkill;
