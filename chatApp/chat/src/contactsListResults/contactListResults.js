import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Contact from "../chatScreen/chatList/contact/Contact";
import Search from "../search/Search";
import { userContext } from "../userContext/UserContext";

function ContactsListResults() {
  const [displayList, setDisplayList] = useState([]);
  const token = localStorage.getItem('token');
  const { setIsLoggedIn, setUser, setContacts,user,currentContact,socket,setCurrntContact } = useContext(userContext);


  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/Chats`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then(resp => resp.json())
          .then(data => {
            if (data.length !== 0){
              setContacts(data);
            }
          });
  }, [currentContact.massagesList]);

  // receiving message
  socket.current.on('get-message', (msg) => {
    fetch(`${process.env.REACT_APP_API_URL}/Chats`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then(resp => resp.json())
          .then(data => {
            if (data.length !== 0){
              setContacts(data);
            }
          });
    if (currentContact.user.username === msg.senderUname){
      fetch(`${process.env.REACT_APP_API_URL}/Chats/${currentContact.id}/Messages`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(resp => resp.json())
      .then(data => {
        setCurrntContact(prevContact => ({
          ...prevContact,
          massagesList: data,
        }));
      }).catch((e)=>console.log(e))
    }
  });
  
 
  const { contacts } = useContext(userContext);
  const searchBox = useRef(null);

  const doSearch = function (q) {
    if (contacts.length !== 0){
      setDisplayList(contacts.filter((contact) => contact.user.displayName.includes(q)));
    }
    
  };


  const contactList = useMemo(
    () =>
      displayList.map((contact, key) => {
        return <Contact contact={contact} key={key} />;
      }),
    [displayList]
  );

  useEffect(() => {
    doSearch(searchBox.current.value);
  }, [contacts]);

  return (
    <ul className="list-group">
      <Search doSearch={doSearch} searchBox={searchBox} />
      {contactList}
    </ul>
  );
}

export default ContactsListResults;