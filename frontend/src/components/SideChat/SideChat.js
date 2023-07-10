import "./SideChat.css";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

function SideChat({ messages }) {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="sidechat">
      <Avatar className="sidechat__avatar" />
      <div className="sidechat__info">
        <h2>Dev Help</h2>
        <p>{messages[messages.length - 1].message}</p>
      </div>
    </div>
  );
}

export default SideChat;
