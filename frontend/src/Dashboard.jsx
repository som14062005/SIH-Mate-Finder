// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ===== Skills & Roles from ProfileSetUp.jsx =====
const csSkills = [
  "React","JavaScript","HTML","CSS","Node.js","Python","Java","C++","C#",
  "TypeScript","Angular","Vue.js","PHP","Ruby","Go","Rust","Swift","Kotlin",
  "Solidity","Blockchain","Machine Learning","Data Science","DevOps","AWS","Docker","Kubernetes"
];

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Data Scientist",
  "AI/ML Engineer",
  "Blockchain Developer",
  "DevOps Engineer",
  "Mobile App Developer",
  "UI/UX Designer",
  "Software Engineer",
  "Cloud Engineer",
  "Cybersecurity Specialist",
  "Game Developer",
  "Embedded Systems Engineer",
  "Other"
];

export default function Dashboard() {
  const [usersData, setUsersData] = useState([]);
  const [myProfile, setMyProfile] = useState(null);
  const [searchUsername, setSearchUsername] = useState("");
  const [searchSkill, setSearchSkill] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [activeTab, setActiveTab] = useState("feed");

  const navigate = useNavigate();
  const loggedInEmail = sessionStorage.getItem("email"); // get logged-in email

  // Fetch all posted profiles for feed
  const fetchPostedProfiles = () => {
    fetch("http://localhost:3000/profile/posted/all")
      .then((res) => res.json())
      .then((data) => {
        // Filter out my own profile from the feed
        const filteredProfiles = data.profiles?.filter(
          (user) => user.collegeMail !== loggedInEmail
        ) || [];
        setUsersData(filteredProfiles);
      })
      .catch((err) => console.error("Failed to fetch posted profiles:", err));
  };

  // Fetch my profile data
  const fetchMyProfile = () => {
    fetch("http://localhost:3000/profile")
      .then((res) => res.json())
      .then((data) => {
        // Find my profile based on email
        const myProf = data.find((user) => user.collegeMail === loggedInEmail);
        if (myProf) setMyProfile(myProf);
      })
      .catch((err) => console.error("Failed to fetch my profile:", err));
  };

  useEffect(() => {
    fetchPostedProfiles(); // Load posted profiles for feed
    fetchMyProfile(); // Load my profile data
  }, [loggedInEmail]);

  /** Filtered feed */
  const filteredUsers = usersData.filter((user) => {
    const matchesUsername = user.name
      ?.toLowerCase()
      .includes(searchUsername.toLowerCase());
    const matchesSkill = searchSkill
      ? user.techStacks?.some((s) =>
          s.toLowerCase().includes(searchSkill.toLowerCase())
        )
      : true;
    const matchesRole = searchRole
      ? user.roles?.some((r) => r.toLowerCase().includes(searchRole.toLowerCase()))
      : true;
    return matchesUsername && matchesSkill && matchesRole;
  });

  /** Handlers */
  const handleViewProfile = (userId, username) => navigate("/profile");
  
  const handlePostProfile = async () => {
    if (!myProfile?._id) {
      alert("Profile not found!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/profile/${myProfile._id}/post`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setMyProfile(updatedProfile);
        fetchPostedProfiles(); // Refresh the feed
        alert("Profile posted successfully!");
      } else {
        alert("Failed to post profile");
      }
    } catch (error) {
      console.error("Error posting profile:", error);
      alert("Error posting profile");
    }
  };

  const handleEditProfile = () => alert("Edit profile logic here");
  
  const handleDeleteProfile = async () => {
    if (!myProfile?._id) {
      alert("Profile not found!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/profile/${myProfile._id}/unpost`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setMyProfile(updatedProfile);
        fetchPostedProfiles(); // Refresh the feed to remove my profile if it was there
        alert("Profile removed from public feed!");
      } else {
        alert("Failed to remove profile from feed");
      }
    } catch (error) {
      console.error("Error removing profile:", error);
      alert("Error removing profile");
    }
  };

  const handleChat = (userId) => navigate("/ChatPage");

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0D0D0D] text-white">
      {/* Tabs */}
      <div className="flex gap-2 mb-8 p-1 rounded-lg mt-6 mx-auto max-w-2xl w-full bg-[#1A1A1A]">
        <button
          className={`flex-1 px-6 py-3 rounded-md font-semibold transition-all ${
            activeTab === "feed"
              ? "bg-[#A259FF] text-white"
              : "text-[#B3B3B3] hover:text-white hover:bg-[#2A2A2A]"
          }`}
          onClick={() => setActiveTab("feed")}
        >
          Feed
        </button>
        <button
          className={`flex-1 px-6 py-3 rounded-md font-semibold transition-all ${
            activeTab === "profile"
              ? "bg-[#A259FF] text-white"
              : "text-[#B3B3B3] hover:text-white hover:bg-[#2A2A2A]"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          My Profile
        </button>
      </div>

      <div className="flex justify-center items-start px-4 flex-1 w-full">
        <div className="w-full max-w-5xl">
          {/* FEED TAB */}
          {activeTab === "feed" && (
            <div>
              {/* Search filters */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 p-6 rounded-xl bg-[#1A1A1A]">
                {/* Username filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#B3B3B3]">
                    Search by Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter username..."
                    value={searchUsername}
                    onChange={(e) => setSearchUsername(e.target.value)}
                    className="bg-[#0D0D0D] border border-[#333] text-white p-3 rounded-lg w-full"
                  />
                </div>

                {/* Skill filter with datalist */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#B3B3B3]">
                    Filter by Skill
                  </label>
                  <input
                    list="skills-list"
                    type="text"
                    placeholder="Enter or select a skill..."
                    value={searchSkill}
                    onChange={(e) => setSearchSkill(e.target.value)}
                    className="bg-[#0D0D0D] border border-[#333] text-white p-3 rounded-lg w-full"
                  />
                  <datalist id="skills-list">
                    {csSkills.map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                </div>

                {/* Role filter with datalist */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#B3B3B3]">
                    Filter by Role
                  </label>
                  <input
                    list="roles-list"
                    type="text"
                    placeholder="Enter or select a role..."
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                    className="bg-[#0D0D0D] border border-[#333] text-white p-3 rounded-lg w-full"
                  />
                  <datalist id="roles-list">
                    {roles.map((r) => (
                      <option key={r} value={r} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Feed cards */}
              <div className="space-y-4">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-8 text-[#B3B3B3]">
                    No posted profiles found matching your search criteria.
                  </div>
                ) : (
                  filteredUsers.map((user) => (
                    <div
                      key={user._id}
                      className="p-6 rounded-xl border border-[#333] bg-[#1A1A1A]"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                          <h3
                            className="text-xl font-semibold cursor-pointer hover:text-[#A259FF]"
                            onClick={() => handleViewProfile(user._id, user.username)}
                          >
                            {user.name}
                            <ExternalLink size={16} className="inline ml-2" />
                          </h3>
                          <p className="text-[#B3B3B3] mb-2">
                            {user.bio || "No bio provided."}
                          </p>
                          <p className="text-sm text-[#888] mb-3">
                            Roles: {user.roles?.join(", ") || "Not specified"}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {user.techStacks?.map((s) => (
                              <span
                                key={s}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-[#0D0D0D] text-[#A259FF] border border-[#333]"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="px-4 py-2 rounded-lg bg-[#A259FF] hover:bg-[#8B3EF2] text-white text-sm"
                            onClick={() => handleChat(user._id)}
                          >
                            Chat!
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* MY PROFILE TAB */}
          {activeTab === "profile" && myProfile && (
            <div className="p-6 rounded-xl border border-[#333] bg-[#1A1A1A] space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{myProfile.name}</h2>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    myProfile.isPosted 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {myProfile.isPosted ? 'Posted' : 'Not Posted'}
                  </span>
                </div>
              </div>
              <p className="text-[#B3B3B3]">{myProfile.bio}</p>
              <p className="text-sm text-[#888]">
                Roles: {myProfile.roles?.join(", ") || "Not specified"}
              </p>
              <div className="flex flex-wrap gap-2">
                {myProfile.techStacks?.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-xs rounded-full bg-[#0D0D0D] text-[#A259FF] border border-[#333]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  className={`px-4 py-2 rounded-lg text-white ${
                    myProfile.isPosted 
                      ? 'bg-gray-600 hover:bg-gray-700 cursor-not-allowed' 
                      : 'bg-[#A259FF] hover:bg-[#8B3EF2]'
                  }`}
                  onClick={handlePostProfile}
                  disabled={myProfile.isPosted}
                >
                  {myProfile.isPosted ? 'Already Posted' : 'Post My Profile'}
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-[#2A2A2A] hover:bg-[#333] text-white"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-white ${
                    myProfile.isPosted 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-gray-600 hover:bg-gray-700 cursor-not-allowed'
                  }`}
                  onClick={handleDeleteProfile}
                  disabled={!myProfile.isPosted}
                >
                  {myProfile.isPosted ? 'Remove from Feed' : 'Not Posted'}
                </button>
              </div>
            </div>
          )}

          {/* Loading state for My Profile */}
          {activeTab === "profile" && !myProfile && (
            <div className="p-6 rounded-xl border border-[#333] bg-[#1A1A1A] text-center">
              <p className="text-[#B3B3B3]">Loading your profile...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}