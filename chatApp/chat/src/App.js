import "./App.css";
import ChatScreen from "./chatScreen/ChatScreen";
import Login from "./login/Login";
import Register from "./register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";
import { userContext } from "./userContext/UserContext";


function App() {
  const socket = useRef(null);
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({
    username: "",
    displayName: "",
    picture: null,  
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [MyMesList, setMyMesList] = useState([]);
  const newtext = useRef("");
  const [showModal, setShowModal] = useState(<></>);
  const [currentContact, setCurrntContact] = useState({
    id:"",
  user : {
  username : "",
  displayName : "",
  profilePic:""
  },
  lastMessage: {
  id : "",
  created : "",
  content : ""
  },
    //name: "",
    //picture: null,
    massagesList: [],
  });
  const [massagesList, setMessagesList] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(apiUrl)
  return (
    <div>
      <BrowserRouter>
        <userContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            contacts,
            setContacts,
            MyMesList,
            setMyMesList,
            newtext,
            setShowModal,
            showModal,
            massagesList,
            setMessagesList,
            currentContact,
            setCurrntContact,
            socket
          }}
        >
          <Routes>
            <Route path="/" element={<Login users={users} />}></Route>
            <Route
              path="/Register"
              element={<Register users={users} setUsers={setUsers} />}
            ></Route>

            <Route path="/chat/*" element={<ChatScreen users={users} />} />
          </Routes>
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
