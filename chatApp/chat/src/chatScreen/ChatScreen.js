import { useContext,useRef } from "react";
import "./ChatScreen.css";
import MyProfile from "./myProfile/MyProfile";
import ChatList from "./chatList/ChatList";
import CurrentChat from "./currentChat/CurrentChat";
import ConversationProfile from "./conversationProfile/ConversationProfile";
import styles from "./ChatScreen.module.css";
import { userContext } from "../userContext/UserContext";
import { Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import { io } from 'socket.io-client';

function ChatScreen({users}) {
  const { isLoggedIn,user,socket } = useContext(userContext);
  
  socket.current = io('http://localhost:12346');
  socket.current.emit("connecting", user.username);

  return (
       
    <div className={styles.container}>
      {(!isLoggedIn) ? (
        <Routes>
      <Route path="/" element={<Login  users={users}/>}></Route>
      </Routes>
        ) : ( 
        <div className={styles.card} id={styles.cardChat}>
          <div className="row">
            <div className="col-4">
              <MyProfile />
            </div>
            <div className="col-8">
              <ConversationProfile />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <ChatList socket = {socket} />
            </div>
            <div className="col-8">
              <CurrentChat socket = {socket} />
            </div>
          </div>
        </div>
        )}
    </div>
    
  );
}

export default ChatScreen;
