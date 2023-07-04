import Message from "./Message";

const Messages = ({ messages} ) => {
  return (
    <div className="messages">
      {messages.map((message) => {
        
        return(
          <div key={message._id}>
          <Message message={message} messages={messages}/>
          </div>
        )
      })}
    </div>
  );
};

export default Messages;
