import styles from "../CurrentChat.module.css";

function MyMessage({message, time}) {
  return (
    <p id={styles.myMessage} className={styles.myMessage}>
      {message}
      <span className={styles.time}>{time}</span>
    </p>
  );
}

export default MyMessage;