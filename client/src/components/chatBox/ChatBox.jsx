import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import FormGroup from 'react-bootstrap/esm/FormGroup';
import Form from "react-bootstrap/Form"
import { IoSendSharp } from "react-icons/io5";
import ScrollToBottom from "react-scroll-to-bottom"
import "./ChatBox.css"
function ChatBox({ socket, room, user }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [typingUser, setTypingUser] = useState()
  console.log(user);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room,
        sender: user,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      // setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const onSubmitChange = (event) => {

    setCurrentMessage(event.target.value);
    // socket.emit('is typing', user)

  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on('typing', (data) => {
      setTypingUser(data)
    })
    // return()=>{
    //   socket.off("send_message")
    // }
  }, [socket]);


  return (
    <div className="chat-window">
      <div className="chat-header">
        <p style={{height:"50%"}}>Live Chat</p>
        {/* <p style={{ height:"50%"}}>{!typingUser && !currentMessage ? null : `${typingUser} is typing...`}</p> */}
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, i) => {
            return (
              <div
                className="message"
                key={i}
                id={user === messageContent.sender ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                    <div className="time">
                      <p id="time">{messageContent.time}</p>
                    </div>
                  </div>
                  <div className="message-meta">
                    <p id="author">{user === messageContent.sender ? "You" : messageContent.sender}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Message..."
          onChange={onSubmitChange}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <Button onClick={sendMessage}>
          <IoSendSharp />
        </Button>
      </div>
    </div>
  )
}

export default ChatBox