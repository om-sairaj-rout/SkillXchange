const DropDownBox = ({ onEditProfile, onLogout }) => (
  <div
    style={{ zIndex: 1000 }}
    className="absolute right-4 top-12 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg flex flex-col py-2"
  >
    <button
      className="px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
      onClick={onEditProfile}
    >
      Edit Profile
    </button>
    <button
      className="px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
      onClick={onLogout}
    >
      Logout
    </button>
  </div>
);

export default DropDownBox;