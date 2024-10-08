import React from 'react'
import Header from "../components/Header";
import SignupSignin from "../components/SignUpSignIn/SignupSignin";
import "../App.css";
const SignUp = () => {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <SignupSignin></SignupSignin>
      </div>
    </div>
  );
};

export default SignUp
