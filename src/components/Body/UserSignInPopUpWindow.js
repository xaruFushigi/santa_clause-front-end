import React, { useContext } from "react";
import PropTypes from "prop-types";
// CSS import
import "./UserSignInPopUpWindow.css";
import {
  myContext,
  uidInputFieldValue,
  usernameInputFieldValue,
} from "../../Context";
const UserSignInPopUpWindow = (props) => {
  // Context variables
  const [
    usernameInputFieldValue,
    uidInputFieldValue,
    setUsernameInputFieldValue,
    setUidInputFieldValue,
    csrfToken, // Retrieve the CSRF token from the context
    setCsrfToken,
  ] = useContext(myContext);
  //
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
        data ? props.togglePopUpWindow() : console.log("soemthign wrong");
      } else {
        throw new Error("failed to fetch user data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="popup-content flex items-center">
        {/* Exit Body */}
        <div>
          <button className="btn-close" onClick={props.togglePopUpWindow}>
            {" "}
            X{" "}
          </button>
        </div>
        {/* Main Body */}
        <div className="box w-50">
          <h2 className="flex justify-start">Enter Your Log In Credentials</h2>

          <div className="flex justify-start flex-column">
            <label htmlFor="userNameInput" className="flex flex-start">
              Name
            </label>
            <input
              type="text"
              name="userNameInput"
              className="w-40"
              placeholder="user name"
              defaultValue={usernameInputFieldValue}
              onChange={props.onUsernameInputChange}
            />
          </div>

          <div className="flex justify-start flex-column">
            <label htmlFor="userIdInput" className="flex justify-start mt3">
              User Id
            </label>
            <input
              type="text"
              name="userIdInput"
              className="w-40"
              placeholder="user id"
              defaultValue={uidInputFieldValue}
              onChange={props.onUidInputChange}
            />
          </div>
          <p>csrfToken: {csrfToken}</p>
          <div className="flex flex-row w-30">
            <button className="mt3 mr2" onClick={fetchFromDatabaseUserData}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

UserSignInPopUpWindow.propTypes = {
  togglePopUpWindow: PropTypes.func.isRequired,
  onUsernameInputChange: PropTypes.func.isRequired,
  onUsernameInputChange: PropTypes.func.isRequired,
};

export default UserSignInPopUpWindow;
