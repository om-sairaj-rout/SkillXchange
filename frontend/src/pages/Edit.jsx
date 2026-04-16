import { useRef, useState, useEffect } from "react"; // Added useEffect to handle user data
import { FaCamera, FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { updateProfile } from "../API/userProfileAPI"; // Make sure this path is correct
import { useNavigate, Link } from "react-router-dom"; // Added Link
import { useDispatch } from "react-redux";
import { updateUser } from "../store/slice/checkAuth"; // Make sure this path is correct

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.checkAuth); // Assuming user data is available here

  // --- Theme Constants ---
  const primaryOrangeBg = "bg-orange-500 hover:bg-orange-600";
  const primaryOrangeText = "text-orange-500";

  // Refs for form inputs
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const bioRef = useRef(null);
  
  const fileInputRef = useRef(null);

  // State for profile picture preview
  const [profilePicPreview, setProfilePicPreview] = useState(
    user?.profilePic || "https://via.placeholder.com/150/FF7F50/FFFFFF?text=JP" // Use user's current pic or a default
  );
  // State to hold the actual file to be uploaded
  const [profilePicFile, setProfilePicFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Initialize refs with user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      usernameRef.current.value = user.username || '';
      emailRef.current.value = user.email || '';
      bioRef.current.value = user.bio || '';
      setProfilePicPreview(user.profilePic || "https://via.placeholder.com/150/FF7F50/FFFFFF?text=JP");
    }
  }, [user]);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file); // Store the actual file
      setProfilePicPreview(URL.createObjectURL(file)); // For instant preview
    }
  };

  const onClickHandler = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("username", usernameRef.current.value); 
    formData.append("email", emailRef.current.value);
    formData.append("bio", bioRef.current.value);
    
    if (profilePicFile) {
      formData.append("profilePic", profilePicFile); // Append the actual file
    } else if (user?.profilePic && !profilePicPreview.startsWith("blob:")) {
        // If no new file selected but there was an old one, and it's not a blob (i.e. not a new preview)
        // You might want to send a flag or the old URL if your backend handles it this way
        // For simplicity, if no new file, we don't append profilePic unless required by backend
    }

    try {
      // Assuming updateUserProfile can handle FormData directly or you transform it
      const res = await updateProfile(user?._id, formData); 
      dispatch(updateUser(res.user)); // Update Redux state with new user data
      setSuccessMsg("Profile updated successfully!");
      // Optionally navigate after a short delay
      setTimeout(() => navigate("/profile"), 1500); 
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800 flex flex-col">
      
      <main className="flex-grow p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-gray-100">
          
          <div className="flex items-center gap-4 border-b pb-4 mb-4 border-gray-200">
            <FaUserEdit className={`text-4xl ${primaryOrangeText}`} />
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          </div>
          
          {/* Status Messages */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm font-medium">
              {successMsg}
            </div>
          )}

          {/* Profile Picture Section */}
          <section className="flex flex-col items-center gap-4 bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100">
            <div className="relative group">
              <img
                src={profilePicPreview}
                alt="Profile Preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-orange-200 shadow-lg transition-transform group-hover:scale-105"
              /> 
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className={`absolute bottom-1 right-1 ${primaryOrangeBg} p-2 rounded-full text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors`}
                aria-label="Change profile picture"
              >
                <FaCamera />
              </button>
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handlePicChange}
              />
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                Change your profile picture
              </p>
            </div>
          </section>
          
          {/* Profile Information Section */}
          <section className="flex flex-col gap-6 bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Username"
                ref={usernameRef}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                ref={emailRef}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <textarea
              placeholder="Tell us about yourself..."
              rows="4" // Increased rows for more visible bio area
              ref={bioRef}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </section>
          
          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={onClickHandler}
              className={`px-8 py-3 text-lg font-semibold text-white rounded-lg transition duration-150 ${primaryOrangeBg} shadow-md`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </main>

    </div>
  );
};

export default EditProfile;