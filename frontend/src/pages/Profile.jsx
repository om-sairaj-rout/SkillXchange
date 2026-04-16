import { useState } from "react"; // Import useState
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/slice/checkAuth";
import { updateSkill } from "../API/userProfileAPI";
import UserProfileSection from "../components/Profile/UserProfileSection";
import AddSkillModal from "../components/Profile/AddSkillModel";
import SkillsSection from "../components/Profile/SkillsSection";
// import { updateUserSkills } from "../store/slice/checkAuth"; // Assuming you have an action to update user skills


const ProfilePage = () => {
  const { user } = useSelector((state) => state.checkAuth);
  const dispatch = useDispatch();

  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [skillTeachButton, setSkillTeachButton] = useState(true);

  // Handler for adding a new skill
  const handleAddSkill = async (newSkill) => {
    try {
      const profileData = skillTeachButton
        ? { skillsTeach: [newSkill] }
        : { skillsLearn: [newSkill] };

      const res = await updateSkill(user?._id, profileData);
      dispatch(updateUser(res.user));
      setShowAddSkillModal(false); // Close modal after adding
    } catch (error) {
      console.error("Error adding skill:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800 flex flex-col">
      <div>
        <main className="p-6 relative" style={{ paddingTop: "4.5rem" }}>
          <div className="max-w-[90%] mx-auto space-y-8">
            {/* User Profile Info Card */}
            <UserProfileSection />

            {/* Skills Section */}
            <SkillsSection 
              setShowAddSkillModal={setShowAddSkillModal}
              setSkillTeachButton={setSkillTeachButton}
            />
          </div>
        </main>
      </div>

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <AddSkillModal
          onClose={() => setShowAddSkillModal(false)}
          onSave={handleAddSkill}
          skillType={skillTeachButton}
        />
      )}
    </div>
  );
};

export default ProfilePage;
