import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSetUp = () => {
  const navigate = useNavigate();

  const [techStacks, setTechStacks] = useState([]);
  const [inputStack, setInputStack] = useState("");
  const [rolesSelected, setRolesSelected] = useState([]);
  const [otherRole, setOtherRole] = useState("");

  // 🔥 Expanded Tech Stack Options (Commonly Used Stacks)
  const availableStacks = [
    // Frontend
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Angular", "Vue.js", "Svelte",
    "TailwindCSS", "Bootstrap", "Material-UI",
    // Backend
    "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "Ruby on Rails", "Laravel", "ASP.NET Core",
    "FastAPI", "NestJS",
    // Mobile & Cross-Platform
    "React Native", "Flutter", "Ionic", "Kotlin", "Swift", "Java (Android)",
    // Databases
    "MongoDB", "MySQL", "PostgreSQL", "SQLite", "Redis", "Firebase", "Supabase", "OracleDB",
    // DevOps & Cloud
    "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "Heroku", "Netlify", "Vercel", "CI/CD",
    "GitHub Actions",
    // Programming Languages
    "C", "C++", "C#", "Java", "Python", "Go", "Rust", "PHP", "Ruby", "Scala", "R",
    // AI & ML
    "TensorFlow", "PyTorch", "Keras", "OpenCV", "Scikit-learn", "Pandas", "NumPy",
    "LangChain", "Hugging Face Transformers",
    // Cybersecurity
    "Kali Linux", "Metasploit", "Burp Suite", "Wireshark", "Nmap",
    // Misc
    "GraphQL", "REST API", "WebSockets", "Blockchain", "Solidity", "Hardhat", "Truffle"
  ];

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Designer",
    "Machine Learning Engineer",
    "AI Engineer",
    "Cyber Security Engineer",
    "Other",
  ];

  // Add tech stack when typing or selecting
  const handleAddStack = (stack) => {
    if (stack && !techStacks.includes(stack)) {
      setTechStacks([...techStacks, stack]);
    }
    setInputStack("");
  };

  // Remove tech stack
  const handleRemoveStack = (stack) => {
    setTechStacks(techStacks.filter((s) => s !== stack));
  };

  // Handle role selection (multiple allowed)
  const toggleRole = (role) => {
    if (rolesSelected.includes(role)) {
      setRolesSelected(rolesSelected.filter((r) => r !== role));
    } else {
      setRolesSelected([...rolesSelected, role]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      name: e.target.name.value,
      year: e.target.year.value,
      collegeMail: e.target.collegeMail.value,
      techStacks,
      roles: rolesSelected.includes("Other")
        ? [...rolesSelected.filter((r) => r !== "Other"), otherRole]
        : rolesSelected,
      linkedin: e.target.linkedin.value,
      github: e.target.github.value,
      bio: e.target.bio.value,
    };

    console.log("Profile Submitted: ", profileData);

    // 👉 send profileData to backend
    // navigate("/devs");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0B0B0B]">
      <div className="w-full max-w-3xl bg-[#141414] p-8 rounded-xl shadow-lg border border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
          Complete Your Profile
        </h1>
        <h2 className="text-lg text-gray-300 text-center mb-6">
          Let others know more about you
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-3 bg-[#0F0F0F] border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Year */}
          <div>
            <label className="text-sm text-gray-400">Year</label>
            <select
              name="year"
              required
              className="w-full p-3 bg-[#0F0F0F] border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          {/* College Mail */}
          <div>
            <label className="text-sm text-gray-400">College Mail ID</label>
            <input
              type="email"
              name="collegeMail"
              required
              placeholder="yourname@rajalakshmi.edu.in"
              className="w-full p-3 bg-[#0F0F0F] border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Tech Stacks */}
          <div>
            <label className="text-sm text-gray-400">Tech Stacks</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {techStacks.map((stack) => (
                <span
                  key={stack}
                  className="px-3 py-1 bg-purple-700 text-white rounded-full text-sm flex items-center gap-1"
                >
                  {stack}
                  <button
                    type="button"
                    className="text-red-400 font-bold"
                    onClick={() => handleRemoveStack(stack)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={inputStack}
              onChange={(e) => setInputStack(e.target.value)}
              placeholder="Type or select a tech stack..."
              className="w-full p-3 bg-[#0F0F0F] border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (inputStack.trim()) handleAddStack(inputStack.trim());
                }
              }}
              list="tech-options"
            />
            <datalist id="tech-options">
              {availableStacks.map((stack) => (
                <option key={stack} value={stack} />
              ))}
            </datalist>
          </div>

          {/* Preferred Roles */}
          <div>
            <label className="text-sm text-gray-400">Preferred Roles</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`px-4 py-2 rounded-lg border text-sm ${
                    rolesSelected.includes(r)
                      ? "bg-purple-500 text-white"
                      : "bg-[#0F0F0F] text-gray-300 border-gray-700"
                  }`}
                  onClick={() => toggleRole(r)}
                >
                  {r}
                </button>
              ))}
            </div>
            {rolesSelected.includes("Other") && (
              <input
                type="text"
                placeholder="Enter your role"
                value={otherRole}
                onChange={(e) => setOtherRole(e.target.value)}
                className="w-full mt-2 p-3 bg-[#0F0F0F] border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}
          </div>

          {/* LinkedIn */}
          <div>
            <label className="text-sm text-gray-400">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedin"
              required
              placeholder="https://linkedin.com/in/username"
              className="w-full p-3 bg-[#0F0F0F] border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="text-sm text-gray-400">GitHub Profile</label>
            <input
              type="url"
              name="github"
              required
              placeholder="https://github.com/username"
              className="w-full p-3 bg-[#0F0F0F] border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm text-gray-400">Short Bio (optional)</label>
            <textarea
              name="bio"
              rows="3"
              placeholder="Tell us a little about yourself..."
              className="w-full p-3 bg-[#0F0F0F] border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-black font-bold py-3 rounded-xl shadow-lg transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetUp;
