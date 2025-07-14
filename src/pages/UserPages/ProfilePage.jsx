import React, { useState, useEffect } from "react";
import UserSidebar from "./UserSidebar";

const ProfilePage = () => {
  // Load stored profile data
  const [profile, setProfile] = useState(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    return (
      savedProfile || {
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        role: "",
        linkedin: "",
        github: "",
        profilePic: "",
      }
    );
  });

  const [imagePreview, setImagePreview] = useState(profile.profilePic);
  const [userLogs, setUserLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    // Load user logs from localStorage
    const logs = JSON.parse(localStorage.getItem("userLogs")) || [];
    setUserLogs(logs);
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfile({ ...profile, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile updated successfully!");
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 bg-gradient-to-b from-blue-50 to-white">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === "profile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === "logs" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("logs")}
          >
            User Logs
          </button>
        </div>

        {activeTab === "profile" ? (
          /* Profile Section */
          <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h2>

            {/* Profile Picture */}
            <div className="flex justify-center mb-6">
              <label
                htmlFor="profilePic"
                className="cursor-pointer relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-gray-300 flex items-center justify-center bg-gray-200"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 text-lg font-medium">No Image</span>
                )}
              </label>
              <input type="file" id="profilePic" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm sm:text-lg font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm sm:text-lg font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm sm:text-lg font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="+91 9876543210"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm sm:text-lg font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="123, Street, City, State"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm sm:text-lg font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm sm:text-lg font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Software Developer, Student, etc."
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-sm sm:text-lg font-medium text-gray-700">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="https://www.linkedin.com/in/yourprofile"
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="block text-sm sm:text-lg font-medium text-gray-700">GitHub Profile</label>
                <input
                  type="url"
                  name="github"
                  value={profile.github}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="https://github.com/yourusername"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full bg-blue-500 text-white py-2 sm:py-3 text-sm sm:text-lg rounded-lg hover:bg-blue-600 transition"
              >
                Save Profile
              </button>
            </div>
          </div>
        ) : (
          /* User Logs Section */
          <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">User Logs</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Login Time</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Logout Time</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Token</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userLogs.length > 0 ? (
                    userLogs.map((log, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">{log.loginTime || "N/A"}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">{log.logoutTime || "N/A"}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">{log.username || "N/A"}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">{log.role || "N/A"}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">{log.ipAddress || "N/A"}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 truncate max-w-xs">
                          {log.token ? `${log.token.substring(0, 10)}...` : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-4 text-center text-sm text-gray-500">
                        No logs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;