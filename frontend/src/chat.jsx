import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// ⚡ replace with your backend URL if deployed
const socket = io("http://localhost:3000"); 

function ChatPage() {
  const { userId } = useParams(); // The user you are chatting with
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const messagesEndRef = useRef(null);

  // Get logged-in userId from sessionStorage
  const currentUserId = sessionStorage.getItem("userId");

  // Join socket and listen for incoming messages
  useEffect(() => {
    if (!currentUserId) return;

    socket.emit("join", currentUserId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUserId]);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to backend
  const sendMessage = () => {
    if (!newMsg.trim() || !currentUserId) return;

    const msg = {
      senderId: currentUserId,
      receiverId: userId,
      text: newMsg,
      time: new Date().toLocaleTimeString(),
    };

    // Show instantly in chat
    setMessages((prev) => [...prev, msg]);

    // Send to backend
    socket.emit("sendMessage", msg);

    setNewMsg("");
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white">
      <header className="p-4 bg-purple-600 text-lg font-bold">
        Chat with User {userId}
      </header>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${
              m.senderId === currentUserId
                ? "bg-purple-500 ml-auto"
                : "bg-gray-700"
            }`}
          >
            {m.text}
            <div className="text-xs text-gray-300">{m.time}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-4 flex gap-2 border-t border-gray-700">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600"
        >
          Send
        </button>
      </footer>
    </div>
  );
}

export default ChatPage;
