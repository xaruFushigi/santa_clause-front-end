import React, { useState, useEffect, useContext } from "react";
import UserSignInPopUpWindow from "./UserSignInPopUpWindow";
import { myContext } from "../../Context";

const Body = (props) => {
  const [giftInputValue, setGiftInputValue] = useState("");
  const [errorMessageForMaxLength, setErrorMessageForMaxLength] = useState(
    <span className="white">Max Allowed characters: 100</span>
  );
  const {
    usernameInputFieldValue,
    uidInputFieldValue,
    csrfToken,
    setCsrfToken,
    toggleUserSignInPopUpWindow,
    togglePopUpWindow,
  } = useContext(myContext);
  // Retrieve authentication status from session storage
  const isAuthenticated = sessionStorage.getItem("authenticated") === "true";

  // Gift letter length checker function
  const checkLengthOfInput = (event) => {
    const { value } = event.target;
    if (value.length > 9) {
      setErrorMessageForMaxLength("Over 100 allowed characters");
    } else {
      setGiftInputValue(value);
      setErrorMessageForMaxLength("");
    }
  };

  const fetchCsrf = async () => {
    try {
      const response = await fetch("http://localhost:3050/csrf-token", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        mode: "cors",
      });
      if (response.ok) {
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } else {
        throw new Error("Failed to fetch CSRF token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCsrf();
  }, []);

  const sendGiftLetterButton = async (event) => {
    event.preventDefault();
    if (!usernameInputFieldValue || !uidInputFieldValue) {
      console.log("Please sign in first");
      return;
    }

    try {
      const response = await fetch("http://localhost:3050/sendGift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          username: usernameInputFieldValue,
          uid: uidInputFieldValue,
          giftMessage: giftInputValue,
          email: "something@gmail.com",
        }),
        credentials: "include",
        mode: "cors",
      });

      if (response.ok) {
        window.location.href = "http://localhost:3000/giftLetterSent";
      } else {
        window.location.href = "http://localhost:3000/giftLetterNotSent";
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Logout button
  const logoutButton = async () => {
    const response = await fetch("http://localhost:3050/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({}),
      credentials: "include",
      mode: "cors",
    });
    if (response.ok) {
      const data = await response.json();
      setCsrfToken(data.csrfToken); // Update the CSRF token
      sessionStorage.removeItem("authenticated"); //remove authneticatio nfrom session storage
      fetchCsrf(); // create new csrfToken after logging out
      togglePopUpWindow();
    }
  };
  //------END OF Button related functions ---------//
  return toggleUserSignInPopUpWindow ? (
    <UserSignInPopUpWindow />
  ) : (
    <div>
      {isAuthenticated && (
        <div>
          {/* name input */}
          <div className="flex flex-column justify-start w-20 ml4 b">
            <label htmlFor="nameInputField" className="flex justify-start">
              who are you?
            </label>
            <input
              name="nameInputField"
              type="text"
              placeholder="input registered name"
              className="br1"
            />
          </div>

          {/* gift input */}
          <div className="flex flex-column justify-start w-20 ml4 mt3 b">
            <label htmlFor="giftInputField" className="flex justify-start">
              what do you want for christmas?
            </label>
            <textarea
              name="giftInputField"
              rows="10"
              cols="45"
              maxLength={10}
              placeholder="Gifts!"
              onChange={checkLengthOfInput}
              defaultValue={giftInputValue}
            />
            {/* if character length over 100 */}
            {errorMessageForMaxLength && (
              <span className="white" htmlFor="giftInputField">
                {errorMessageForMaxLength}
              </span>
            )}
          </div>

          {/* send button */}
          <div className="flex justify-end ml4 w-20 mt3">
            <button className="b red w-25 br2" onClick={sendGiftLetterButton}>
              Send
            </button>
          </div>

          {/* Logout button */}
          <div className="flex justify-end ml4 w-20 mt3">
            <button className="b red w-25 br2" onClick={logoutButton}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
