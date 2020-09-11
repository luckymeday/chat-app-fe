import React from "react";
import socket from "../socket";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

export default function ChatInput() {
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const message = e.target.chat.value;
    const file = e.target.upload.files[0];
    if (file) {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/ddvtfamv3/upload",
        form
      );
      console.log(res);
      if (res.status.toString().startsWith("2")) {
        socket.emit("sendMessage", {
          type: "image",
          chat: res.data.secure_url,
        });
      }
    } else if (message) {
      socket.emit("sendMessage", {
        type: "string",
        chat: message,
      });
    }

    // socket.emit("sendMessage", message);
    const form = document.getElementById("chatform");
    form.reset();
  };
  return (
    <form onSubmit={handleChatSubmit} id="chatform" className="chatform">
      {/* <input name="chat" placeholder="chat with me" /> */}
      {/* <input type="submit" value="send message" /> */}

      <TextField
        name="chat"
        id="outlined-basic"
        label="my message"
        variant="outlined"
        className="chatbox"
      />
      <input type="file" name="upload" />
      {/* <p></p> */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        // className={classes.button}
        endIcon={<Icon>send</Icon>}
        className="chatbutton"
      >
        Send
      </Button>
    </form>
  );
}
