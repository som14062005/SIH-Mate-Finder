import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// ⚡ change later to your backend URL (Render/Heroku etc.)
const socket = io("http://localhost:3000"); 

function ChatPage() {
  const { userId } = useParams(); // person you're chatting with
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // For demo: assume current logged-in user id = "me123"
  // Later, replace with real logged-in user ID from backend
  const currentUserId = "me123";

  useEffect(() => {
    // Join with my ID
    socket.emit("join", currentUserId);

    // Listen for messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    const msg = {
      senderId: currentUserId,
      receiverId: userId,
      text: newMsg,
      time: new Date().toLocaleTimeString(),
    };

    // Show instantly in my chat
    setMessages((prev) => [...prev, msg]);

    // Send to backend (other user will receive)
    socket.emit("sendMessage", msg);

    setNewMsg("");
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
      </div>

      <footer className="p-4 flex gap-2 border-t border-gray-700">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
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