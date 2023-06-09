import React from "react";

const SuccessRoute = (props) => {
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
          <h1>Congratulation Your letter has been sent to Santa !!!</h1>
        </div>
      </div>
    </div>
  );
};

export default SuccessRoute;
