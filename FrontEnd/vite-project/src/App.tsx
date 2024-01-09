import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import { FaTelegramPlane } from "react-icons/fa";
function App() {
  const [room, setRoom] = useState(0);
  const [socket, setSocket] = useState(undefined);
  const [inbox, setInbox] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  function handleSendMessage() {
    if (socket) {
      console.log("message", message, room);
      socket.emit("message", message, room);

      setMessage("");
    }
  }

  useEffect(() => {
    const socket = io("http://localhost:3003/");

    socket.on("message", (message) => {
      setInbox([...inbox, message]);
    });

    setSocket(socket);
  }, [inbox]);
  let count = 0;
  return (
    <>
      <section className="container">
        <div>
          <ul>
            <div className="person1">
              <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />
              <p>Alex</p>
            </div>
            {inbox &&
              inbox.map((elem, i) => {
                if (count == 2) {
                  count = 1;
                } else {
                  count++;
                }
                return count == 1 ? (
                  <div className="chat2">
                    <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" />

                    <input className="input2" type="text" value={elem} />
                  </div>
                ) : (
                  <div className="salam">
                    <div className="chat2" id="two">
                      <img src="https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" />

                      <input
                        className="input2"
                        id="one"
                        type="text"
                        value={elem}
                      />
                    </div>
                  </div>
                );
              })}
          </ul>
        </div>
        <div className="Humans">
          <div className="chat1">
            <input
              className="input1"
              placeholder="Enter the message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
            />
            <button className="btn" onClick={handleSendMessage}>
              <FaTelegramPlane />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
