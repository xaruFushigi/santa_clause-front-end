import React from "react";

const FailureRoute = (props) => {
  return (
    <div>
      <div className="popup-content flex items-center">
        {/* Exit Body */}
        <div>
          <button className="btn-close" onClick={props.toggleButton}>
            {" "}
            X{" "}
          </button>
        </div>
        {/* Main Body */}
        <div className="box w-50">
          <h1>
            You should be 10 years old or younger to be able to send letter to
            Santa
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FailureRoute;
