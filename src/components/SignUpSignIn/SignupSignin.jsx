import React, { useState } from "react";
import "./styles.css";
import Input from "../Input/Input";
function SignupSignin() {
  const [name, setName] = useState("");

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}> Financy.</span>
      </h2>

      <form action="">
        <Input
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"John Doe"}
        ></Input>
      </form>
    </div>
  );
}

export default SignupSignin;
