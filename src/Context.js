import React, { createContext, useState } from "react";
export const myContext = createContext([]);

const Context = (props) => {
  const [usernameInputFieldValue, setUsernameInputFieldValue] = useState("");
  const [uidInputFieldValue, setUidInputFieldValue] = useState("");
  const [csrfToken, setCsrfToken] = useState(""); // State to store the CSRF token

  const contextValues = [
    usernameInputFieldValue,
    uidInputFieldValue,
    setUsernameInputFieldValue,
    setUidInputFieldValue,
    csrfToken,
    setCsrfToken,
  ];
  return (
    <div>
      <myContext.Provider value={contextValues}>
        {props.children}
      </myContext.Provider>
    </div>
  );
};

export default Context;
