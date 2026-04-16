import React, { useRef } from 'react'

const IconTimes = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path
      fill="currentColor"
      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L247.3 256 342.6 150.6z"
    />
  </svg>
);

const AddSkillModal = ({ onClose, onSave, skillType }) => {
    const skillNameRef = useRef("");
    const skillDescriptionRef = useRef("");
    const skillPricingRef = useRef("");
    const skillLevelRef = useRef("Beginner");

    
    const primaryOrangeBg = "bg-orange-500 hover:bg-orange-600";

    const handleSubmit = (e) => {
      e.preventDefault();

      const skillName = skillNameRef.current.value;
      const skillDescription = skillDescriptionRef.current.value;
      const skillPricing = skillPricingRef.current.value;
      const skillLevel = skillLevelRef.current.value;

      if (!skillName.trim()) {
        alert("Please fill in skill name.");
        return;
      }

      if (skillType && !skillPricing) {
        alert("Please fill in the hourly rate for your teaching skill.");
        return;
      }
      onSave({
        name: skillName.trim(),
        description: skillDescription.trim(),
        pricing: parseFloat(skillPricing),
        level: skillLevel,
        rating: 0, // New skills start with 0 rating
      });
      onClose(); // Close modal after saving
    };

    return (
      <div className="fixed inset-0 backdrop-blur flex justify-center items-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md animate-fade-in-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Add a New Skill
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <IconTimes className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="skillName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Skill Name
              </label>
              <input
                type="text"
                id="skillName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                ref={skillNameRef}
                placeholder="e.g., React Development"
                required
              />
            </div>
            <div>
              <label
                htmlFor="skillDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description (Optional)
              </label>
              <textarea
                id="skillDescription"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                ref={skillDescriptionRef}
                placeholder="Briefly describe what you teach in this skill..."
              ></textarea>
            </div>
            {skillType && (
              <>
                <div>
                  <label
                    htmlFor="skillPricing"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Hourly Rate (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      id="skillPricing"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      ref={skillPricingRef}
                      placeholder="e.g., 25.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="skillLevel"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Experience Level
                  </label>
                  <select
                    id="skillLevel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    ref={skillLevelRef}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </>
            )}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 ${primaryOrangeBg} text-white rounded-lg font-medium transition-colors`}
              >
                Save Skill
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default AddSkillModal;