import React, { useRef, useState, useContext } from "react";
import "../pages.css";
import { useNavigate } from "react-router-dom";
import { userContext } from "../userContext/UserContext";


function Login() {
  const { setIsLoggedIn, setUser, setContacts,user, } = useContext(userContext);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();

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

  async function searchUser(event) {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const username = formData.get("uname");
    const password = formData.get("psw");
    const data = { username: username, password: password };
    // Get the token from the server.
    fetch(`${process.env.REACT_APP_API_URL}/Tokens`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then(resp => {
    if (resp.status !== 200) {
      // Handle the error case when the status code is 400
      // Add your desired condition here
      
      setErrorMessage("Incorrect username or password");
      
    }
    return resp.json();
  })
  .then(html => {
    // Save the token in localStorage.
    localStorage.setItem('token', html.accessToken);
    // Take all details of the user from the server.
    fetch(`${process.env.REACT_APP_API_URL}/Users/${username}`, {
      headers: {
        authorization: `Bearer ${html.accessToken}`,
      },
    })
      .then(resp => resp.json())
      .then(data => {
        const newUser = {
          username: data.username,
          displayName: data.displayName,
          picture: base64ToFile(data.profilePic, "myImage.jpg")
        }
        setUser(newUser);
      })
      .catch(error => {
        // Handle the error case when fetching user details
        console.error('Error fetching user details:', error);
        // Perform appropriate actions without stopping the app
        // For example, display an error message to the user
      });

    // Take all chats of the user from the server.
    fetch(`${process.env.REACT_APP_API_URL}/Chats`, {
      headers: {
        authorization: `Bearer ${html.accessToken}`,
      },
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.length !== 0) {
          setContacts(data);
        }
        setIsLoggedIn(true);
        navigate('/chat');
      })
      .catch(error => {
        // Handle the error case when fetching chats
        setErrorMessage("Incorrect username or password");
      });
  })
  .catch(error => {
    // Handle the error case when the first fetch fails
    setErrorMessage("Incorrect username or password");
  });

}

  return (
    <div className="container">
      <div className="card" style={{ backgroundColor: "#e4e4e4" }}>
        <h2>Welcome back!</h2>
        <form ref={formRef} onSubmit={searchUser}>
          <div className="container">
            <label htmlFor="uname">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required=""
            />
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required=""
            />
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <button type="submit">LOGIN</button>
          </div>
          <div className="container" style={{ backgroundColor: "#dbdbdb" }}>
            <div className="not_register">
              Not registered? <a href="/Register">Click here</a> to register
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
