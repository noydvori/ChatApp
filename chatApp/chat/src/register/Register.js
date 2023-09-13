import "../pages.css";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ users }, {setUsers}) {
  
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     console.log(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}


  async function addUser(event) {
    
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const username = formData.get("uname");
    const password = formData.get("psw");
    const displayName = formData.get("dname");
    const pictureFile = formData.get("pic");
    
    // Convert picture file to a Base64-encoded string
    const reader = new FileReader();
    reader.onloadend = function () {
      const pictureString = reader.result;
      
      
      const data = { username: username, password: password, displayName: displayName, profilePic: pictureString };
      
      fetch(`${process.env.REACT_APP_API_URL}/Users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            navigate("/");
          } else {
            setErrorMessage("One or more incorrect fields");
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setErrorMessage("An error occurred.");
        });
    };  
    reader.readAsDataURL(pictureFile);
  }
  


  return (
    <div className="container">
      <div className="card" style={{ backgroundColor: "#e4e4e4" }}>
        <h2>Join Us!</h2>
        <form ref={formRef} onSubmit={addUser}>
          <div className="container">
            <label htmlFor="uname">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
            />
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              id="psw"
              name="psw"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
            <label htmlFor="dname">
              <b>Display name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Display Name"
              name="dname"
              required
            />
            <label htmlFor="pic">
              <b>Picture</b>
            </label>
            <input
              name="pic"
              type="file"
              accept="image/*"
              id="pic"
              required
            />
             {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <button type="submit">REGISTER</button>
          </div>
          <div className="container" style={{ backgroundColor: "#dbdbdb" }}>
            <div className="not_register">
              Already registered? <a href="/">Click here</a> to login
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register
