import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/slice/checkAuth";
import { removeSkillAPI } from "../../API/userProfileAPI";


const IconPlusCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
    />
  </svg>
);

const IconTimes = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path
      fill="currentColor"
      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L247.3 256 342.6 150.6z"
    />
  </svg>
);

const SkillsSection = ({ setShowAddSkillModal, setSkillTeachButton }) => {
  const { user } = useSelector((state) => state.checkAuth);
  const dispatch = useDispatch();

  const handleRemoveSkill = async (skillToRemove, isTeach) => {
    try {
      if (!skillToRemove?.name) return;

      const res = await removeSkillAPI(user?._id, skillToRemove?.name, isTeach);

      // Update Redux with the latest user data
      dispatch(updateUser(res.user));
    } catch (error) {
      console.error("Error removing skill:", error.message);
    }
  };

  const handleSkillType = (s) => {
    if (s === "teach") {
      setSkillTeachButton(true);
    } else {
      setSkillTeachButton(false);
    }

    setShowAddSkillModal(true);
  };

  // --- SKILL CARD COMPONENT (now with a remove button) ---
  const SkillCard = ({ skill, onRemove }) => (
    <div className="relative bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
      <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
      {skill.description && (
        <p className="text-sm text-gray-500 mt-1 mb-2">
          {skill.description.substring(0, 70)}
          {skill.description.length > 70 ? "..." : ""}
        </p>
      )}
      {skill.level && (
        <p className="text-sm text-gray-500 capitalize">Level: {skill.level}</p>
      )}
      {skill.pricing && (
        <p className="text-md font-bold text-green-600">
          ${skill.pricing} / hr
        </p>
      )}

      <div className="flex items-center mt-auto pt-2">
        {skill.rating && (
          <>
            <span className="text-yellow-400">★</span>
            <span className="text-gray-700 ml-1 text-sm">{skill.rating}</span>
          </>
        )}
      </div>
      <button
        onClick={() => onRemove(skill)}
        className="absolute top-2 right-2 p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
        aria-label={`Remove skill ${skill.name}`}
      >
        <IconTimes className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <>
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Skills Teaching
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Map over userSkills (local state) to display dynamic cards */}
          {user?.skillsTeach.map((skill, index) => (
            <SkillCard
              key={index}
              skill={skill}
              onRemove={(skill) => handleRemoveSkill(skill, true)}
            />
          ))}

          {/* Add New Skill Card/Button */}
          <button
            onClick={() => handleSkillType("teach")}
            className="flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors cursor-pointer min-h-[120px]"
            style={{ minHeight: "120px" }} // Ensure consistent height with skill cards
          >
            <IconPlusCircle className="w-8 h-8 mb-2" />
            <span className="text-lg font-semibold">Add New Skill</span>
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Skills Learning
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Map over userSkills (local state) to display dynamic cards */}
          {user?.skillsLearn.map((skill, index) => (
            <SkillCard
              key={index}
              skill={skill}
              onRemove={(skill) => handleRemoveSkill(skill, false)}
            />
          ))}

          {/* Add New Skill Card/Button */}
          <button
            onClick={() => handleSkillType("learn")}
            className="flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors cursor-pointer min-h-[120px]"
            style={{ minHeight: "120px" }} // Ensure consistent height with skill cards
          >
            <IconPlusCircle className="w-8 h-8 mb-2" />
            <span className="text-lg font-semibold">Add New Skill</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default SkillsSection;
