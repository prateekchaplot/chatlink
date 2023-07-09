import "./SideChat.css";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

function Chat() {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="sidechat">
      <Avatar className="sidechat__avatar" />
      <div className="sidechat__info">
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  );
}

export default Chat;
