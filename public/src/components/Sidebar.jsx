import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const Sidebar = ({ contacts, handleChatChange, currentUser }) => {
  // console.log('hi');



  return (
    <div className="sidebar">
      <Navbar currentUser={currentUser} />
      <Search />
      <Chats contacts={contacts} handleChatChange={handleChatChange} />
    </div>
  );
};

export default Sidebar;
