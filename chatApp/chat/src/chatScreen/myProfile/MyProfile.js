import React, { useContext } from "react";
import man from "../../man.jpg";
import styles from "./MyProfile.module.css";
import { userContext } from "../../userContext/UserContext";
import Modal from "./Modal";

function MyProfile() {
  const { user, showModal, setShowModal } = useContext(userContext);
  

  function openModel() {
    setShowModal(<Modal setShowModal={setShowModal} />);
  }

  function pic() {
    if (user.picture == null) {
      return man;
    } else {
      try{
        return URL.createObjectURL(user.picture);
      }
      catch {
        return man;
      }
    }
  }


  return (
    <div className="d-flex bd-highlight align-self-center">
      <div className="bd-highlight box">
        <img src={pic()} alt="profile" className={styles.roundedCircle} />
      </div>
      <h5
        className={`p-2 bd-highlight d-flex justify-content-between ${styles.a}`}
      >
        {user.displayName}
      </h5>

      {/*--modalBTN--*/}
      {/* Button trigger modal */}
      <button
        type="button"
        className="ms-auto p-2 bd-highlight align-self-center btn btn-light"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        id={styles.addBtn}
        onClick={openModel}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={25}
          fill="currentColor"
          className={`bi bi-person-add ${styles.add}`}
          viewBox="0 0 16 16"
        >
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
        </svg>
      </button>
      {/* Modal */}
      {showModal}
    </div>
  );
}

export default MyProfile;
