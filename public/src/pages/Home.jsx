import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { usersRoute, host } from "../utils/APIroutes";
import axios from "axios";
import {io} from "socket.io-client";

const Home = () => {

  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() => {

    async function getCurrentUser() {
      // console.log('hi');
      if (!localStorage.getItem("chat-app-current-user")) {
        navigate("/");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem("chat-app-current-user")
          )
        );
        // console.log(currentUser);
      }
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function getContacts() {
      if (currentUser) {
        {
          // console.log(currentUser._id);
          const data = await axios.get(`${usersRoute}/${currentUser._id}`);
          setContacts(data.data);
        }
      }
    }
    getContacts();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    // console.log(chat)
    setCurrentChat(chat);
  };

  return (
    <div className='home'>
      <div className="container">
        <Sidebar contacts={contacts} handleChatChange={handleChatChange} currentUser={currentUser} />
        <Chat currentChat={currentChat} currentUser={currentUser} socket={socket}/>
      </div>
    </div>
  )
}
export default Home