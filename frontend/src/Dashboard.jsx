// src/pages/Dashboard.jsx
import React, { useState } from "react";
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

// ===== Dummy feed data =====
const dummyUsersData = [
  {
    _id: "user1",
    username: "alex_dev",
    bio: "Full-stack developer passionate about React and Node.js. Building the future of web applications.",
    skills: ["React", "Node.js", "JavaScript", "MongoDB"],
    role: "Fullstack Developer",
  },
  {
    _id: "user3",
    username: "mike_python",
    bio: "Data scientist and machine learning engineer. Love working with Python and AI technologies.",
    skills: ["Python", "Machine Learning", "Data Science", "TensorFlow"],
    role: "Data Scientist",
  },
  {
    _id: "user9",
    username: "ryan_fullstack",
    bio: "Full-stack engineer with 5+ years experience. Love building end-to-end solutions.",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    role: "Fullstack Developer",
  },
];

// ===== Dummy current user =====
const dummyMyProfile = {
  _id: "currentUser",
  username: "my_username",
  bio: "Your profile bio here...",
  skills: ["React", "Node.js"],
  role: "Frontend Developer",
};

export default function Dashboard() {
  const [usersData, setUsersData] = useState(dummyUsersData);
  const [searchUsername, setSearchUsername] = useState("");
  const [searchSkill, setSearchSkill] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [activeTab, setActiveTab] = useState("feed");
  const [myProfile] = useState(dummyMyProfile);

  const navigate = useNavigate();

  /** Navigate to user profile */
  const handleViewProfile = (userId, username) => {
    navigate("/profile"); // stub
  };

  /** Post my profile to feed */
  const handlePostProfile = () => {
    if (!usersData.find((u) => u._id === myProfile._id)) {
      setUsersData((prev) => [...prev, myProfile]);
      alert("Your profile has been posted to the feed!");
    } else {
      alert("Profile already posted.");
    }
  };

  /** Edit profile */
  const handleEditProfile = () => {
    alert("Edit Profile clicked - implement update logic here.");
    // navigate("/profilesetup");
  };

  /** Delete post */
  const handleDeleteProfile = () => {
    setUsersData((prev) => prev.filter((u) => u._id !== myProfile._id));
    alert("Your profile has been removed from the feed.");
  };

  /** Navigate to ChatPage */
  const handleChat = (userId) => {
    navigate("/ChatPage");
  };

  /** Filtered feed */
  const filteredUsers = usersData.filter((user) => {
    const matchesUsername = user.username
      ?.toLowerCase()
      .includes(searchUsername.toLowerCase());
    const matchesSkill = searchSkill
      ? user.skills?.some((s) =>
          s.toLowerCase().includes(searchSkill.toLowerCase())
        )
      : true;
    const matchesRole = searchRole
      ? user.role?.toLowerCase().includes(searchRole.toLowerCase())
      : true;
    return matchesUsername && matchesSkill && matchesRole;
  });

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
                {filteredUsers.map((user) => (
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
                          {user.username}
                          <ExternalLink size={16} className="inline ml-2" />
                        </h3>
                        <p className="text-[#B3B3B3] mb-2">
                          {user.bio || "No bio provided."}
                        </p>
                        <p className="text-sm text-[#888] mb-3">
                          Role: {user.role || "Not specified"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {user.skills?.map((s) => (
                            <span
                              key={s}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-[#0D0D0D] text-[#A259FF] border border-[#333]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      {user._id !== myProfile._id && (
                        <div className="flex items-center gap-2">
                          <button
                            className="px-4 py-2 rounded-lg bg-[#A259FF] hover:bg-[#8B3EF2] text-white text-sm"
                            onClick={() => handleChat(user._id)}
                          >
                            Chat!
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MY PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="p-6 rounded-xl border border-[#333] bg-[#1A1A1A] space-y-4">
              <h2 className="text-2xl font-bold">{myProfile.username}</h2>
              <p className="text-[#B3B3B3]">{myProfile.bio}</p>
              <p className="text-sm text-[#888]">Role: {myProfile.role}</p>
              <div className="flex flex-wrap gap-2">
                {myProfile.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-xs rounded-full bg-[#0D0D0D] text-[#A259FF] border border-[#333]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  className="px-4 py-2 rounded-lg bg-[#A259FF] hover:bg-[#8B3EF2] text-white"
                  onClick={handlePostProfile}
                >
                  Post My Profile
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-[#2A2A2A] hover:bg-[#333] text-white"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDeleteProfile}
                >
                  Delete My Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
