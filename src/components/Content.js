import React from "react";
import socket from "../socket";
import ChatInput from "./ChatInput";

const Content = ({ user }) => {
  return (
    <div className="content">
      <div className="chatContent">
        <Messages user={user} />
      </div>

      <div className="chatInput">
        <ChatInput />
      </div>
    </div>
  );
};

const Messages = ({ user }) => {
  const [messages, setMessages] = React.useState([]);
  const messagesRef = React.useRef(messages);

  React.useEffect(() => {
    socket.on("chatHistory", function (history) {
      messagesRef.current = history;
      document.getElementById("messages").scrollTop = 700;
      setMessages(history);
    });
  }, []);

  React.useEffect(() => {
    socket.on("message", function (chat) {
      messagesRef.current = [...messagesRef.current, chat];
      setMessages(messagesRef.current);
      autoScroll();
    });
  }, []);

  const autoScroll = () => {
    var elem = document.getElementById("messages");
    console.log(elem.lastElementChild);
    if (!elem.lastElementChild) return;
    const lastElHeight = elem.lastElementChild.scrollHeight;
    const firstElHeight = elem.firstElementChild.scrollHeight;
    console.log(lastElHeight);
    console.log(firstElHeight);
    const a = messagesRef.current[0];
    if (
      (elem &&
        elem.scrollHeight - elem.scrollTop <
          elem.offsetHeight + lastElHeight * 5) ||
      a.chat.startsWith("Welcome")
    ) {
      elem.scrollTop = elem.scrollHeight;
    }
  };

  return (
    <div id="messages" className="messages">
      {messages.map((e) => (
        <Message key={e.id} obj={e} user={user} />
      ))}
    </div>
  );
};

const Message = ({ obj, user }) => {
  if (obj.type === "image") {
    return <img src={`${obj.chat}`} alt="somethingwrong" />;
  } else if (obj.type === "string") {
    return (
      <div className="message">
        <span
          className={obj.user._id === user._id ? "blue" : "black"}
          style={{ fontWeight: "bold" }}
        >
          {obj.user.name}
        </span>
        <span className={obj.user._id === user._id ? "blue" : "black"}>
          {obj.user._id === user._id ? obj.chat + " :" : " : " + obj.chat}
        </span>
      </div>
    );
  }
};

export default Content;
