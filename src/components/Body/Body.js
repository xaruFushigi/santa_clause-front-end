// React related imports
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
// JS related imports
import UserSignInPopUpWindow from "./UserSignInPopUpWindow";
import {
  myContext,
  uidInputFieldValue,
  usernameInputFieldValue,
} from "../../Context";
const Body = (props) => {
  const [giftInputValue, setgiftInputValue] = useState("");
  const [errorMessageForMaxLength, setErrorMessageForMaxLength] = useState(
    <span className="gray">Max Allowed characters: 100</span>
  );
  const [toggleUserSignInPopUpWindow, setToggleUserSignInPopUpWindow] =
    useState(true);
  const [
    usernameInputFieldValue,
    uidInputFieldValue,
    setUsernameInputFieldValue,
    setUidInputFieldValue,
    csrfToken,
    setCsrfToken,
  ] = useContext(myContext);

  //-------- INPUT related functions ------------//
  const onUsernameInputChange = (event) => {
    setUsernameInputFieldValue(event.target.value);
  };
  const onUidInputChange = (event) => {
    setUidInputFieldValue(event.target.value);
  };
  // Gift letter length checker function
  const checkLengthOfInput = (event) => {
    const { value } = event.target;
    // checks input length
    if (value.length > 9) {
      setErrorMessageForMaxLength("Over 100 allowed characters");
    } else {
      setgiftInputValue(value);
      setErrorMessageForMaxLength("");
    }
  };
  //------END OF INPUT related functions ---------//

  //-- --//
  const fetchCsrf = async () => {
    try {
      const response = await fetch("http://localhost:3050/csrf-token", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
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
  //-- --//

  //-------- Button related functions ------------//
  // Gift letter send button
  const sendGiftLetterButton = async (event) => {
    event.preventDefault();
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
          email: "animeko4u@gmail.com",
        }),
        credentials: "include",
        mode: "cors",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = "http://localhost:3000/giftLetterSent";
      }
    } catch (error) {
      console.log(error);
    }
  };
  // toggle PopUp Window
  const togglePopUpWindow = () => {
    setToggleUserSignInPopUpWindow((prevCondition) => !prevCondition);
  };
  //------END OF Button related functions ---------//
  return toggleUserSignInPopUpWindow ? (
    <UserSignInPopUpWindow
      togglePopUpWindow={togglePopUpWindow}
      //   usernameInputFieldValue={props.usernameInputFieldValue}
      //   uidInputFieldValue={props.uidInputFieldValue}
      onUsernameInputChange={onUsernameInputChange}
      onUidInputChange={onUidInputChange}
    />
  ) : (
    <div>
      {/* name input */}
      <div className="flex flex-column justify-start w-20 ml4">
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
      <div className="flex flex-column justify-start w-20 ml4 mt3">
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
          <span className="red error" htmlFor="giftInputField">
            {errorMessageForMaxLength}
          </span>
        )}
      </div>

      {/* send button */}
      <div className="flex justify-end ml4 w-20 mt3">
        <button className="" onClick={sendGiftLetterButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Body;
