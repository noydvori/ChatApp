import man from "../../man.jpg";
import styles from "./ConversationProfile.module.css";
import { userContext } from "../../userContext/UserContext";
import React, { useContext } from "react";

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

function ConversationProfile() {
  const { currentContact } = useContext(userContext);
  function pic(){
    if(currentContact.user.profilePic==null){
      return man
    } else {
      try{
        const pic = currentContact.user.profilePic;
            const filename = "myImage.jpg";
            const file = base64ToFile(pic, filename);
        return (URL.createObjectURL(file));
      }
      catch {
        return man;
      }
      
    }
  }

  if(currentContact.user.username === ""){
    return (
      <div className="d-flex justify-content-start align-self-center">
        <div className={styles.box}>
        </div>
        <h5 className="d-flex justify-content-between align-self-center">
          {currentContact.user.displayName}
        </h5>
      </div>
    );  } else{
    return (
      <div className="d-flex justify-content-start align-self-center">
        <div className={styles.box}>
          <img src={pic()} alt="profile" className="rounded-circle" />
        </div>
        <h5 className="d-flex justify-content-between align-self-center">
          {currentContact.user.displayName}
        </h5>
      </div>
    );
  }
}

export default ConversationProfile;
