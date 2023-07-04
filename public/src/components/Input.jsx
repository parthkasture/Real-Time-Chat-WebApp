import Img from "../img/img.png";
import Attach from "../img/attach.png";
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
        {/* <img src={Attach} alt="" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label> */}
        <button onClick={(event) => sendChat(event)}>Send</button>
      </div>
    </div>
  );
};

export default Input;
