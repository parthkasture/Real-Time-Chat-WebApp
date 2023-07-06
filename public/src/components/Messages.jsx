import Message from "./Message";
import uuid4 from "uuid4";

const Messages = ({ messages }) => {
  return (
    <div className="messages">
      {messages.map((message) => {

        return (
          <Message message={message} messages={messages} key={uuid4()} />
        )
      })}
    </div>
  );
};

export default Messages;
