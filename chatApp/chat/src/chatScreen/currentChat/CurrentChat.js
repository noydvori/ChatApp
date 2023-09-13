import styles from "../currentChat/CurrentChat.module.css";
import MyMessagesList from "./myMessageList/MyMessageList";
import { userContext } from "../../userContext/UserContext";
import React, { useContext, useEffect, useRef, useState } from "react";

function CurrentChat() {
  const {
    setContacts,
    contacts,
    newtext,
    setCurrntContact,
    currentContact,
    setMyMesList,
    user,
    socket
  } = useContext(userContext);

  const messagesEndRef = useRef(null);

  const [messageTest, setMessTest] = useState({
    msg: newtext.current.value,
    recieverUname: currentContact.user.username
  })
  useEffect(() => {
    scrollToBottom();
  }, [currentContact]);

  function scrollToBottom() {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function newMessage(event) {
    event.preventDefault();
    const id = currentContact.id;
    if (newtext.current.value === "") {
      return;
    }

    const currentTime = new Date().toISOString();
    const newMessage = {
      content: newtext.current.value,
      sender: user, //?? user.username token?
      created: currentTime,
    };
    const msg = {
      msg: newtext.current.value,
    };

    // send message to server
    const message = {
      msg: newtext.current.value,
      recieverUname: currentContact.user.username,
      senderUname: user.username
    };
    const token = localStorage.getItem('token');

    // send new message
    fetch(`${process.env.REACT_APP_API_URL}/Chats/${id}/Messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(msg),
    })
      .then(resp => resp.json())
      .then(data => {
        setMessTest({
          msg: newtext.current.value,
          recieverUname: currentContact.user.username
        })
        socket.current.emit("get-message", messageTest);
        setCurrntContact(prevContact => ({
          ...prevContact,
          massagesList: data,
        }));
         // Emit socket event after POST request and database update
      }).then(socket.current.emit("get-message", message))
    setMyMesList((prev) => [...prev, newMessage]);
    let updatedMassagesList = "";
    if (typeof currentContact.massagesList == "undefined") {
      updatedMassagesList = [newMessage];
    } else {
      updatedMassagesList = [...currentContact.massagesList, newMessage];
    }
    setCurrntContact((prevContact) => ({
      ...prevContact,
      massagesList: updatedMassagesList,
    }));
    newtext.current.value = "";

    scrollToBottom();
    // send message to server
    socket.current.emit("get-message", message)
  }
  


  function contactName() {
    if (currentContact.name === "") {
      return true
    } else {
      return false
    }
  }

  function isInputString() {
    if (newtext.current.value === "") {
      return true
    } else {
      return false
    }
  }

  function isBtnActive() {
    if (contactName() || isInputString()) {
      return false
    } else {
      return true
    }
  }

  return (
    <div className={styles.currentChat}>
      {/* Current chat */}
      <div className={`${styles.chatMessages} ${styles.hideScrollbar}`}>
        <div className={styles.container}>
          <MyMessagesList />
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className={styles.chatInput}>
        {/* Input field for sending messages */}
        <form onSubmit={newMessage} className={styles.formText}>
          <input
            ref={newtext}
            className={styles.chatInput}
            htmlFor="inputText"
            type="text"
            id="inputField"
            placeholder="Type your message..."
            disabled={currentContact.id === ""}
          />
          <button
            className={styles.sendBTN}
            type="submit"
            disabled={isBtnActive()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CurrentChat;
