import { useEffect, useState, useRef} from "react";
import io from "socket.io-client";
import "./App.css";
const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  
  console.log("CHAT STATE:", chat);
const chatEndRef = useRef(null);
  const joinRoom = () => {
  if (room.trim()) {
    socket.emit("join_room", room);
    alert(`Joined room: ${room}`);
  }
  

};
const sendMessage = () => {
  console.log("Button clicked");
  if (!username.trim()) {
  alert("Please enter a username");
  return;
}
  if (message.trim()) {
    socket.emit("send_message", {
      room,
  username,
  message,
  time: new Date().toLocaleTimeString(),
});

    console.log("Message sent:", message);

    setMessage("");
  }
};
useEffect(() => {
  setTimeout(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);
}, [chat]);
 useEffect(() => {
  console.log("Trying to connect...");

  socket.on("connect", () => {
    console.log("CONNECTED:", socket.id);
  });

  socket.on("receive_message", (data) => {
    console.log("RECEIVED:", data);
    setChat((prev) => [...prev, data]);
  });

  socket.on("connect_error", (err) => {
    console.log("CONNECT ERROR:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("DISCONNECTED:", reason);
  });

  return () => {
    socket.off("connect");
    socket.off("receive_message");
    socket.off("connect_error");
    socket.off("disconnect");
  };
}, []);
  return (
  <div className="chat-container">

  <div className="chat-header">
    <h2>💬 Real-Time Chat App</h2>
  </div>

  <div className="chat-box">
  {chat.map((msg, i) => (
    <div
      key={i}
      className={
        msg.username === username
          ? "message my-message"
          : "message"
      }
    >
      <strong>{msg.username}</strong>
      <p>{msg.message}</p>
      <small>{msg.time}</small>
    </div>
  ))}

  <div ref={chatEndRef}></div>
</div>

  <div className="input-section">

    <input
      type="text"
      placeholder="Enter Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    <input
      type="text"
      placeholder="Enter Room"
      value={room}
      onChange={(e) => setRoom(e.target.value)}
    />

    <input
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      }}
    />

    <div className="btn-group">
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={sendMessage}>Send</button>
    </div>
    

  </div>

</div>
);
}

export default App;