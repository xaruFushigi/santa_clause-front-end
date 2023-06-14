import React, { useContext, useEffect } from "react";
// CSS import
import "./UserSignInPopUpWindow.css";
import { myContext } from "../../Context";

const UserSignInPopUpWindow = (props) => {
  // Context variables
  const {
    usernameInputFieldValue,
    uidInputFieldValue,
    csrfToken,
    setAuthenticated,
    togglePopUpWindow,
    onUsernameInputChange,
    onUidInputChange,
  } = useContext(myContext);

  useEffect(() => {
    // Check authentication status on component mount
    const isAuthenticated = sessionStorage.getItem("authenticated") === "true";
    if (isAuthenticated) {
      // Update the authenticated state in the context
      setAuthenticated(true);
      togglePopUpWindow();
    }
  }, [togglePopUpWindow, setAuthenticated]);

  const fetchFromDatabaseUserData = async (event) => {
    event.preventDefault();
    if (!usernameInputFieldValue || !uidInputFieldValue) {
      console.log("Enter a username and uid");
      return;
    }
    try {
      const response = await fetch("http://localhost:3050/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          username: usernameInputFieldValue,
          uid: uidInputFieldValue,
        }),
        credentials: "include",
        mode: "cors",
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          // Update the authenticated state in the context
          setAuthenticated(true);
          // Save authentication status in session storage
          sessionStorage.setItem("authenticated", "true");
          togglePopUpWindow();
        }
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="popup-content flex items-center">
        {/* Main Body */}
        <div className="box w-50">
          <h2 className="flex justify-start">Enter Your Log In Credentials</h2>

          <div className="flex justify-start flex-column">
            <label htmlFor="userNameInput" className="flex flex-start b">
              Name
            </label>
            <input
              type="text"
              name="userNameInput"
              className="w-40"
              placeholder="user name"
              defaultValue={usernameInputFieldValue}
              onChange={onUsernameInputChange}
            />
          </div>

          <div className="flex justify-start flex-column">
            <label htmlFor="userIdInput" className="flex justify-start mt3 b">
              User Id
            </label>
            <input
              type="text"
              name="userIdInput"
              className="w-40"
              placeholder="user id"
              defaultValue={uidInputFieldValue}
              onChange={onUidInputChange}
            />
          </div>
          <div className="flex flex-row w-30">
            <button
              className="mt3 mr2 red b"
              onClick={fetchFromDatabaseUserData}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignInPopUpWindow;
