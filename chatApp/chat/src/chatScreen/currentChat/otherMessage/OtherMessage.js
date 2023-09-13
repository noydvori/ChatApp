import styles from "../CurrentChat.module.css";

function OtherMessage({message, time}) {
  return (
    <p id={styles.otherMessage} className={styles.otherMessage}>
      {message}
      <span className={styles.time}>{time}</span>
    </p>
  );
}

export default OtherMessage;
