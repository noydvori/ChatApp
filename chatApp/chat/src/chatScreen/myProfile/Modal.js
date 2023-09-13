import styles from "./MyProfile.module.css";
import { userContext } from "../../userContext/UserContext";
import React, { useContext, useRef } from "react";


function Modal() {
  const { setShowModal, setContacts, newtext, setCurrntContact,currentContact,user,socket } = useContext(userContext);
  const newContact = useRef({
    id:"",
    user : {
      username : "",
      displayName : "",
      profilePic:""
    },
    massagesList: [],
  });
  
  function closeModel() {
    setShowModal(<></>);
  }

  async function addNewContact() {
    if (!newContact.current.value) {
      newContact.current.value = "";
      setShowModal(<></>);
      return;
    }
    const personUsername = { "username": newContact.current.value }
    const token = localStorage.getItem('token');
    // Add new contact to the server.
    fetch(`${process.env.REACT_APP_API_URL}/Chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(personUsername),
      })
        .then(resp => {
          if (resp.status !== 200) {
            // Handle the error case when the status code is 400
            // Add your desired condition here
            alert("not a user please type again")
            newContact.current.value=""
          }
          return resp.json()
        })
        .then(data => {
          // data = new chat = { id , user, lastMessage} 
          const newCon = {id: data.id, user: data.user, lastMessage: ""};
          // Merge the fetched contact into the existing contacts array.
          setContacts(prevContacts => [...prevContacts, newCon]);
          setCurrntContact(newCon);
          socket.current.emit("add-contact", personUsername.username);
          
        }).catch(error => {
          // Handle the error case when fetching user details
          console.error('Error add user:', error);
        });
        
    newtext.current.focus();
    newContact.current.value = "";
    setShowModal(<></>);
  }
  
  return (
    <div className={styles.bigCard}>
      <div className={styles.card}>
        <div className="modal-dialog modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add new contact
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModel}
              />
            </div>
            <div className="modal-body d-flex flex-column bd-highlight mb-3">
              <input
                type="text"
                placeholder="Enter contact's identifier"
                className="p-2 bd-highlight"
                ref={newContact}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                id={styles.addBtn}
                onClick={addNewContact}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
