import { useState } from "react";
import JoinScreen from "./JoinScreen";
import ChatScreen from "./ChatScreen";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <JoinScreen setUser={setUser} />
      ) : (
        <ChatScreen user={user} />
      )}
    </div>
  );
}

export default App;