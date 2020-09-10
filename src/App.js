import React from "react";
import "./App.css";
import socket from "./socket";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import "fontsource-roboto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLemon } from "@fortawesome/free-solid-svg-icons";
import { Container } from "@material-ui/core";

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    socket.on("connection");

    return () => {
      socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    askForName();
  }, []);

  const askForName = () => {
    const name = prompt("What is your nickname?");
    if (name) {
      socket.emit("login", name, (res) => {
        setUser(res);
      });
    } else {
      askForName();
    }
  };

  return (
    <Container>
      <div className="body">
        <Navbar user={user} />
        <Main user={user} />
      </div>
    </Container>
  );
}

const Navbar = ({ user }) => {
  return (
    <div className="mynav">
      {/* <h1>{user && user.name}</h1> */}

      <h1>
        {user
          ? `"${user.name}" has visited Online Flea Market! `
          : `Welcome to our Online Flea Market! `}
        <FontAwesomeIcon icon={faLemon} />
      </h1>
    </div>
  );
};
export default App;
