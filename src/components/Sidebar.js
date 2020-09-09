import React from 'react';
import socket from "../socket"

export default function Sidebar({ user }) {
    const [rooms, setRooms] = React.useState([]);
    const [currentRoom, setCurrentRoom] = React.useState(null);

    React.useEffect(() => {
        socket.on("rooms", function (data) {
          if (data && Array.isArray(data)) {
            setRooms(data)
          }
        })
      }, [rooms])


    return (
    <div className="sidebar">
        <h1>{user && user.name}</h1>
        <Rooms
        rooms={rooms}
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
         />
        </div>

    )
}






const Rooms = props => props.rooms.map((e, idx) => {
    return <span
        className={!props.currentRoom ? "" : (e._id === props.currentRoom._id ? "bold" : "")}
        onClick={() => {
            if (props.currentRoom) {
                socket.emit("leaveRoom", props.currentRoom._id);
            }
            socket.emit(
                "joinRoom",
                e._id, res => {
                    if (res.status === 'ok') {
                        props.setCurrentRoom(res.data.room)
                    } else {
                        alert("something wrong")
                    }
                })
        }}> {e.room} {idx === props.rooms.length - 1 ? "" : ","} </span>
})

