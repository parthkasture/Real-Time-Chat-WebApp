import React, { useState } from "react";

const Input = ({ handleSendMsg }) => {

  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setMsg(e.target.value)}
        value={msg} />
      <div className="send" >
        <button onClick={(event) => sendChat(event)}>Send</button>
      </div>
    </div>
  );
};

export default Input;
