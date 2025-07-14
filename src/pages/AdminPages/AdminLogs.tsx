import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";

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

  const handleDeleteLog = (index) => {
    if (window.confirm("Are you sure you want to delete this log entry?")) {
      const updatedLogs = [...userLogs];
      updatedLogs.splice(index, 1);
      setUserLogs(updatedLogs);
      localStorage.setItem("userLogs", JSON.stringify(updatedLogs));
    }
  };

  const handleClearAllLogs = () => {
    if (window.confirm("Are you sure you want to delete ALL log entries?")) {
      setUserLogs([]);
      localStorage.setItem("userLogs", JSON.stringify([]));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 bg-gradient-to-b from-blue-50 to-white">
           <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">User Logs</h2>
              {userLogs.length > 0 && (
                <button
                  onClick={handleClearAllLogs}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-red-600 transition"
                >
                  Clear All Logs
                </button>
              )}
            </div>
            
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
                    <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                        <td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                          <button
                            onClick={() => handleDeleteLog(index)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete log"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-4 text-center text-sm text-gray-500">
                        No logs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProfilePage;