// src/pages/ProfilePage.jsx
import React, { useState } from "react";

export default function ProfilePage() {
  const [profile] = useState({
    name: "John Doe",
    year: "3rd Year",
    email: "john.doe@rajalakshmi.edu.in",
    techStack: ["React", "Node.js", "Python"],
    role: "Frontend Developer",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    bio: "Passionate about building scalable web applications and learning new technologies.",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B] px-6">
      <div className="w-full max-w-3xl bg-[#141414] p-10 rounded-2xl shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-[#A259FF] to-purple-700 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
            {profile.name.charAt(0)}
          </div>
          <h1 className="mt-4 text-3xl font-bold text-purple-400">
            {profile.name}
          </h1>
          <p className="text-gray-400 mt-1">
            {profile.year} • {profile.role}
          </p>
        </div>

        {/* Profile Details */}
        <div className="space-y-8">
          {/* Email */}
          <div className="p-4 rounded-xl bg-[#1C1C1C] border border-gray-700 hover:border-purple-500 transition">
            <h2 className="text-sm font-medium text-gray-400">College Email</h2>
            <p className="text-white mt-1">{profile.email}</p>
          </div>

          {/* Tech Stack */}
          <div className="p-4 rounded-xl bg-[#1C1C1C] border border-gray-700 hover:border-purple-500 transition">
            <h2 className="text-sm font-medium text-gray-400">Tech Stack</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.techStack.map((stack) => (
                <span
                  key={stack}
                  className="px-3 py-1 text-sm rounded-full bg-[#0D0D0D] text-[#A259FF] border border-gray-700"
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#1C1C1C] border border-gray-700 hover:border-purple-500 transition">
              <h2 className="text-sm font-medium text-gray-400">LinkedIn</h2>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline break-all mt-1 block"
              >
                {profile.linkedin}
              </a>
            </div>
            <div className="p-4 rounded-xl bg-[#1C1C1C] border border-gray-700 hover:border-purple-500 transition">
              <h2 className="text-sm font-medium text-gray-400">GitHub</h2>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline break-all mt-1 block"
              >
                {profile.github}
              </a>
            </div>
          </div>

          {/* Bio */}
          <div className="p-4 rounded-xl bg-[#1C1C1C] border border-gray-700 hover:border-purple-500 transition">
            <h2 className="text-sm font-medium text-gray-400">Bio</h2>
            <p className="text-gray-300 mt-2">
              {profile.bio || "No bio provided."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}