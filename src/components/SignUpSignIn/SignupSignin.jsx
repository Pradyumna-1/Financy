import React, { useState } from "react";
import "./styles.css";
import Input from "../Input/Input";
import Button from "../Button/Button";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignupSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);

    // Authenticate the user or basically create a new account using email and password
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("user >>", user);
            toast.success("User Created");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setLoading(false);
            createDoc(user);
            navigate("/dashboard");

            // Create a doc with user id as the following id
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);

            // ..
          });
      } else {
        toast.error("Password miss match   ");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  // for login
  function loginUsingEmail() {
    setloading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User logged in");
          console.log(user);
          setLoading(false);
          navigate("/dashboard");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }
  async function createDoc(user) {
    // Make sure that the doc with the uid doesn't exist
    // Create a doc.
    setLoading(true);

    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created ");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exits");
      setLoading(false);
    }
  }

  // For google popup

  function googleAuth() {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User authenticated! ");
        })
        .catch((error) => {
          // Handle Errors here.
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          toast.error(errorMessage);
        });
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}> Financy.</span>
          </h2>

          <form action="">
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"xyz@gmail.com"}
            />

            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"XYz@11124##"}
            />

            <Button
              disabled={loading}
              text={loading ? "loading...." : "Login using email and password"}
              onClick={loginUsingEmail}
            />
            <p className="p-login">Or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading...." : "Login  using Google"}
              blue={true}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Don't have an account ? Click here
            </p>
          </form>
        </div>
      ) : (
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
            />
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"xyz@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"XYz@11124##"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"XYz@11124##"}
            />
            <Button
              disabled={loading}
              text={
                loading ? "loading...." : "Sign up using email and password"
              }
              onClick={signupWithEmail}
            />
            <p className="p-login">Or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading...." : "Sign up using Google"}
              blue={true}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or have an account already ? click here
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSignin;
