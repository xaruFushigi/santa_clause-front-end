import React, { useContext } from "react";
//Routes related dependency
import { BrowserRouter, Routes, Route } from "react-router-dom";
// CSS related imports
import "./App.css";
import "tachyons";
// JS imports
import {
  Header,
  Body,
  UserSignInPopUpWindow,
  Footer,
  SuccessRoute,
  FailureRoute,
} from "./components";
import { myContext } from "./Context";

function App() {
  // Context variables
  const { authenticated, toggleButton } = useContext(myContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          {authenticated ? (
            <>
              <Route
                path="/giftLetterSent"
                element={<SuccessRoute toggleButton={toggleButton} />}
              />
              <Route
                path="/giftLetterNotSent"
                element={<FailureRoute toggleButton={toggleButton} />}
              />
            </>
          ) : (
            <Route
              path="/signin"
              exact
              element={
                <>
                  <UserSignInPopUpWindow />
                  <Route path="/" exact element={<Body />} />
                  <Route
                    path="/giftLetterSent"
                    element={<SuccessRoute toggleButton={toggleButton} />}
                  />
                  <Route
                    path="/giftLetterNotSent"
                    element={<FailureRoute toggleButton={toggleButton} />}
                  />
                </>
              }
            />
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
