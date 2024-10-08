import React from "react";
import "./style.css";
function Input({ label, stae, setState, placeholder }) {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        value={stae}
        onChange={(e) => setState(e.target.value)}
        className="custom-input"
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
