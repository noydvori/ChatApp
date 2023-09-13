import MyMessage from "../myMessage/MyMessage";
import OtherMessage from "../otherMessage/OtherMessage";
import { userContext } from "../../../userContext/UserContext";
import React, { useContext } from "react";

function MyMessageList() {
  const { currentContact, user } = useContext(userContext);
  let messageList = "";

  if (typeof currentContact.massagesList !== "undefined") {
    const sortedMessages = currentContact.massagesList.sort((a, b) => new Date(a.created) - new Date(b.created));
    
    messageList = sortedMessages.map((message, key) => {
      const messageTime = new Date(message.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      if (message.sender.username === user.username) {
        
        return <MyMessage message={message.content} time={messageTime} key={key} />;
      } else {
        
        return <OtherMessage message={message.content} time={messageTime} key={key} />;
      }
      
    });
  }

  return <div>{messageList}</div>;
}

export default MyMessageList;
