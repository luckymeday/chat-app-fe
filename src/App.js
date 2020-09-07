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
    socket.on("message", function ({ user, message }) {
      const id = uuidv4()
      messagesRef.current = [...messagesRef.current, {
        user,
        message,
        id
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
    return messages.map(e => <Message key={e.id} obj={e} user={user} />)
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


const Message = ({ obj, user }) => {
  return <p>
    <span
      className={obj.user === user ? 'red' : 'black'}
      style={{ fontWeight: 'bold' }}>
      {obj.user}
    </span>
      : {obj.message}</p>
}

export default App;
