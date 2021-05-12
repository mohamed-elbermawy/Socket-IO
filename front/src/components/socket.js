import { addResponseMessage, Widget } from "react-chat-widget";
import io from "socket.io-client";

import "react-chat-widget/lib/styles.css";
import { useEffect, useState } from "react";
const url = "http://localhost:5000";

const socket = io(url);

let data = {
  massage: "",
  destinationSocketId: "",
};

function Socket(params) {
  const [socketId, setSocketId] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    data.destinationSocketId = socketId;
    setSocketId("");
  };

  const handleNewUserMessage = (newMessage) => {
    // Now send the message throught the backend API
    data.massage = newMessage;
    socket.emit("massage", data);
  };
  useEffect(() => {
    socket.on("massage-back", (data) => {
      console.log(data);
      addResponseMessage(data);
    });
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3 mt-5 mb-5">
          <h1>Socket IO Chat</h1>
          <div className="form-group">
            <form onSubmit={handelSubmit}>
              <input
                type="text"
                className="form-control"
                id="socketId"
                placeholder="Enter SocketId of the Destination"
                value={socketId}
                onChange={(e) => setSocketId(e.target.value)}
              />
            </form>
          </div>
        </div>
        <Widget handleNewUserMessage={handleNewUserMessage} />
      </div>
    </div>
  );
}

export default Socket;
