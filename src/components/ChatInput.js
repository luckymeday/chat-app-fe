import React from 'react'
import socket from "../socket";

export default function ChatInput() {
    const handleChatSubmit = (e) => {
        e.preventDefault();
        const message = e.target.chat.value
        socket.emit("sendMessage", message)
        const form = document.getElementById("chatform");
        form.reset();
    }
    return (
        <form onSubmit={handleChatSubmit} id="chatform">
            <input name="chat" placeholder="chat with me" />
            <input type="submit" value="send message" />
        </form>
    )
}
