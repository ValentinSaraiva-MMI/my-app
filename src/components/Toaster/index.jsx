import React from "react";
import "./toaster.css";

const Toaster = ({ message, type, onClose }) => {
  return (
    <div className={`toaster ${type}`}>
      <p>{message}</p>
      <button className="close-button" onClick={onClose}>
        Fermer
      </button>
    </div>
  );
};

export default Toaster;
