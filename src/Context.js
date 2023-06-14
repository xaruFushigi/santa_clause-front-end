import React, { createContext, useState } from "react";

export const myContext = createContext();

const Context = (props) => {
  const [usernameInputFieldValue, setUsernameInputFieldValue] = useState("");
  const [uidInputFieldValue, setUidInputFieldValue] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [authenticated, setAuthenticated] = useState(true);
  const [toggleUserSignInPopUpWindow, setToggleUserSignInPopUpWindow] =
    useState(true);

  // toggle PopUp Window
  const togglePopUpWindow = () => {
    setToggleUserSignInPopUpWindow((prevCondition) => !prevCondition);
  };
  //-------- INPUT related functions ------------//
  const onUsernameInputChange = (event) => {
    setUsernameInputFieldValue(event.target.value);
  };
  const onUidInputChange = (event) => {
    setUidInputFieldValue(event.target.value);
  };

  const contextValues = {
    usernameInputFieldValue,
    setUsernameInputFieldValue,
    uidInputFieldValue,
    setUidInputFieldValue,
    csrfToken,
    setCsrfToken,
    authenticated,
    setAuthenticated,
    toggleUserSignInPopUpWindow,
    setToggleUserSignInPopUpWindow,
    togglePopUpWindow,
    onUsernameInputChange,
    onUidInputChange,
  };

  return (
    <myContext.Provider value={contextValues}>
      {props.children}
    </myContext.Provider>
  );
};

export default Context;
