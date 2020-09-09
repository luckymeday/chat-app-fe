import React from 'react';
import './App.css';
import socket from "./socket";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    socket.on("connection")

    return () => {
      socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    askForName()
  }, [])

  const askForName = () => {
    const name = prompt("What is your nickname?");
    if (name) {
      socket.emit("login", name, res => {
        setUser(res)
      })
    } else {
      askForName()
    }
  }

  return (
    <div className="body">
      <Navbar user={user} />
      <Main user={user} />
    </div>
  )
}


const Navbar = () => {
  return (
    <div className="mynav">awesome Nav</div>
  )
}
export default App;
