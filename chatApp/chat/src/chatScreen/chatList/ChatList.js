import styles from "./ChatList.module.css";
import ContactsListResults from "../../contactsListResults/contactListResults";

function ChatList() {
  return (
    <div className={styles.chatList}>
      {/* List of all chats */}
      <ContactsListResults />
    </div>
  );
}

export default ChatList;
