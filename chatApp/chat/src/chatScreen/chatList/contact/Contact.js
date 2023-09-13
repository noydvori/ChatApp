import man from "../../../man.jpg";
import styles from "./Contact.module.css";
import { userContext } from "../../../userContext/UserContext";
import React, { useContext, useEffect,useState } from "react";

function Contact({ contact }) {
  // contact = {id, lastMessage, user}
  // user = {username, displayName, profilePic}
  // lastMessage = {id, sender{username}, created}
  const { setCurrntContact, currentContact } = useContext(userContext);
function base64ToFile(base64String, filename) {
  const base64Parts = base64String.split(",");
  const contentType = base64Parts[0].split(":")[1].split(";")[0];
  const base64Data = base64Parts[1];
  const binaryString = window.atob(base64Data);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([byteArray], { type: contentType });
  const file = new File([blob], filename, { type: contentType });
  return file;
}

useEffect(() => {
  const token = localStorage.getItem('token');
  if (currentContact.id !== "") {
    // Render all messages of the current chat.
    fetch(`${process.env.REACT_APP_API_URL}/Chats/${currentContact.id}/Messages`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(resp => resp.json())
      .then(data => {
        setCurrntContact(prevContact => ({
          ...prevContact,
          massagesList: data,
        }));
      });
  }
}, [currentContact.id]);


function changeCurrent() {
  if(contact.id !== currentContact.id){
  setCurrntContact({ id: contact.id, user: contact.user});
  }
}

  
function time() {
  if (contact && contact.lastMessage) {
    const messageTime = new Date(contact.lastMessage.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return messageTime;
  }
  return "";
}
function lastSentance() {
    if (contact && contact.lastMessage !== "") {
      return contact.lastMessage.content;
    }
    return "";
}

function pic() {
  if(currentContact.user.profilePic==null){
    return man
  } else {
    try {
        const pic = contact.user.profilePic;
            const filename = "myImage.jpg";
            const file = base64ToFile(pic, filename);
        return (URL.createObjectURL(file));
    }
    catch {
      return man;
    }
  }
}
  
  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      onClick={changeCurrent}
    >
      <div className="liContent">
        <div className={styles.box2}>
          <img src={pic()} alt="profile" className={styles.roundedCircle} />
        </div>
        <div className={styles.nameLastsentance}>
          <h6>{contact.user.displayName}</h6>
          <small>{lastSentance()}</small>
        </div>
        <div className="position-absolute top-0 end-0">
          <small className={styles.nmsg}>{time()}</small>
          <br />
          <span className="badge bg-primary rounded-pill"></span>
        </div>
      </div>
    </li>
  );
}

export default Contact;
