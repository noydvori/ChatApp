import { createContext } from "react";
export const userContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: {
    username: "",
    displayName: "",
    picture: null,
  },
  setUser: () => {},
  contacts: [],
  setContacts: () => {},
  newtext: "",
  showModal: <></>,
  setShowModal: () => {},
  massagesList: [],
  setMassagesList: () => {},
  currentContact: {
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
    massagesList: [],
  },
  setCurrntContact: () => {},
  socket: null,
});
