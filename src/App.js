import React from "react";
//Routes related dependency
import { BrowserRouter, Routes, Route } from "react-router-dom";
// CSS related imports
import "./App.css";
import "tachyons";
// JS imports
import { Header, Body, Footer, SuccessRoute, FailureRoute } from "./components";

function App() {
  const toggleButton = () => {
    window.location.href = "http://localhost:3000/";
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<Body />} />
          <Route
            path="/giftLetterSent"
            element={<SuccessRoute toggleButton={toggleButton} />}
          />
          <Route
            path="/giftLetterNotSent"
            element={<FailureRoute toggleButton={toggleButton} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
