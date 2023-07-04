import React, { useContext, useEffect, useRef } from "react";
import Add from "../img/samPle1.png";


const Message = ({message, messages}) => {

  const scrollRef = useRef();
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  
  return (


    <div className={`message ${message.fromSelf ? "owner" : null}`} ref={scrollRef}>
      {/* <div className="messageInfo">
        <img src={Add} alt="" />
        <span>just now</span>
      </div> */}
      <div className="messageContent">
        <p>{message.message}</p>
        {/* <img src={Add} alt="" /> */}
      </div>
    </div>
  );
};

export default Message;
