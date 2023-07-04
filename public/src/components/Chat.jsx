import React, {useState, useEffect, useRef} from "react";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIroutes";

const Chat = ({ currentChat, currentUser,socket }) => {

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    async function f(){
      const data = await JSON.parse(
        localStorage.getItem("chat-app-current-user")
      );
      const response = await axios.post(recieveMessageRoute, {
        from: currentChat ? data._id : null,
        to: currentChat ? currentChat._id : null,
      });
      setMessages(response.data);
    }
    f();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem("chat-app-current-user")
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("chat-app-current-user")
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    console.log(arrivalMessage);
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  
  // console.log(contacts);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{currentChat ? currentChat.username : "Welcome!"}</span>
        {/* <div className="chatIcons">
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div> */}
      </div>
      <Messages messages={messages} />
      <Input handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default Chat;
