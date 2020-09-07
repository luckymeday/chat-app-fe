import React from 'react';
import './App.css';
import socket from "./socket";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [messages, setMessages] = React.useState([]);
  const [user, setUser] = React.useState(null)
  const messagesRef = React.useRef([])

  React.useEffect(() => {
    socket.on("connection")

    return () => {
      socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const name = prompt("What is your name");
    setUser(name)
  }, [])

  React.useEffect(() => {
    socket.on("message", function (msg) {
      const k = uuidv4()
      messagesRef.current = [...messagesRef.current, {
        user: msg.user,
        message: msg.message,
        id: k
      }]
      setMessages(messagesRef.current)
    })
  }, []);


  const handleChatSubmit = (e) => {
    e.preventDefault();
    const message = e.target.chat.value
    socket.emit("sendMessage", {
      user,
      message
    })
    const form = document.getElementById("chatform");
    form.reset();
  }

  const renderMessages = (messages) => {
    return messages.map(e => <Message key={e.id} uuid={e.id} obj={e} user={user} />)
  }

  return (
    <div>
      <form onSubmit={handleChatSubmit} id="chatform">
        <input name="chat" placeholder="chat with me" />
        <input type="submit" value="send message" />
      </form>
      {renderMessages(messages)}

    </div>
  );
}


const Message = (props) => {
  return <p>
    <span
      className={props.obj.user === props.user ? 'red' : 'black'}
      style={{ fontWeight: 'bold' }}>
      {props.obj.user}
    </span>
      : {props.uuid}</p>
}

export default App;
