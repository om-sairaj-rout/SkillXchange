const user = require("../../models/user.model");

const getRecommendedUsers = async (req, res) => {
  try {
    const { userId } = req.params;

    const currentUser = await user.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const learnSkills = currentUser.skillsLearn?.map((s) => s.name) || [];
    const teachSkills = currentUser.skillsTeach?.map((s) => s.name) || [];

    const recommendedUsers = await user.find({
      _id: { $ne: userId },
      $or: [
        { "skillsTeach.name": { $in: learnSkills } },
        { "skillsLearn.name": { $in: teachSkills } },
      ],
    }).limit(15);

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = getRecommendedUsers;