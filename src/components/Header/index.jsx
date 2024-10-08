import React from "react";
import "./styles.css";

const Header= () => {

function logoutFun(){
  alert("Logout")
}

  return (
    <div className="navbar">
    <p className="logo">
      Financy
    </p>
    <p className="logo link" onClick={logoutFun}>Logout</p>
    </div>
  )
};

export default Header;
