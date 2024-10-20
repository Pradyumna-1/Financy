// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, provider, db } from "../firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
// } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import Header from "./Header";
// import { toast } from "react-toastify";
// import "./singup.css";

// const SignUpSignIn = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [flag, setFlag] = useState(false);
//   const navigate = useNavigate();

//   const createUserDocument = async (user) => {
//     setLoading(true);
//     if (!user) return;

//     const userRef = doc(db, "users", user.uid);
//     const userData = await getDoc(userRef);

//     if (!userData.exists()) {
//       const { displayName, email, photoURL } = user;
//       const createdAt = new Date();

//       try {
//         await setDoc(userRef, {
//           name: displayName ? displayName : name,
//           email,
//           photoURL: photoURL ? photoURL : "",
//           createdAt,
//         });
//         toast.success("Account Created!");
//         setLoading(false);
//       } catch (error) {
//         toast.error(error.message);
//         console.error("Error creating user document: ", error);
//         setLoading(false);
//       }
//     }
//   };

//   const signUpWithEmail = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     try {
//       const result = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = result.user;
//       await createUserDocument(user);
//       toast.success("Successfully Signed Up!");
//       setLoading(false);
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(error.message);
//       console.error(
//         "Error signing up with email and password: ",
//         error.message
//       );
//       setLoading(false);
//     }
//   };

//   const signInWithEmail = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     try {
//       const result = await signInWithEmailAndPassword(auth, email, password);
//       const user = result.user;
//       navigate("/dashboard");
//       toast.success("Logged In Successfully!");
//       setLoading(false);
//     } catch (error) {
//       toast.error(error.message);
//       console.error(
//         "Error signing in with email and password: ",
//         error.message
//       );
//       setLoading(false);
//     }
//   };

//   const signInWithGoogle = async () => {
//     setLoading(true);
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       await createUserDocument(user);
//       toast.success("User Authenticated Successfully!");
//       setLoading(false);
//       navigate("/dashboard");
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.message);
//       console.error("Error signing in with Google: ", error.message);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="wrapper">
//         {flag ? (
//           <div className="signup-signin-container">
//             <h2 style={{ textAlign: "center" }}>
//               Log In on <span className="blue-text">Financely.</span>
//             </h2>
//             <form onSubmit={signUpWithEmail}>
//               <div className="input-wrapper">
//                 <p>Email</p>
//                 <input
//                   type="email"
//                   placeholder="JohnDoe@gmail.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div className="input-wrapper">
//                 <p>Password</p>
//                 <input
//                   type="password"
//                   placeholder="Example123"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>

//               <button
//                 disabled={loading}
//                 className="btn"
//                 onClick={signInWithEmail}
//               >
//                 {loading ? "Loading..." : " Log In with Email and Password"}
//               </button>
//             </form>
//             <p style={{ textAlign: "center", margin: 0 }}>or</p>
//             <button
//               disabled={loading}
//               className="btn btn-blue"
//               onClick={signInWithGoogle}
//             >
//               {loading ? "Loading..." : " Log In with Google"}
//             </button>
//             <p
//               onClick={() => setFlag(!flag)}
//               style={{
//                 textAlign: "center",
//                 marginBottom: 0,
//                 marginTop: "0.5rem",
//                 cursor: "pointer",
//               }}
//             >
//               Or Don't Have An Account? Click Here.
//             </p>
//           </div>
//         ) : (
//           <div className="signup-signin-container">
//             <h2 style={{ textAlign: "center" }}>
//               Sign Up on <span className="blue-text">Financely.</span>
//             </h2>
//             <form onSubmit={signUpWithEmail}>
//               <div className="input-wrapper">
//                 <p>Full Name</p>
//                 <input
//                   type="text"
//                   placeholder="John Doe"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="input-wrapper">
//                 <p>Email</p>
//                 <input
//                   type="email"
//                   placeholder="JohnDoe@gmail.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div className="input-wrapper">
//                 <p>Password</p>
//                 <input
//                   type="password"
//                   placeholder="Example123"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>

//               <div className="input-wrapper">
//                 <p>Confirm Password</p>
//                 <input
//                   type="password"
//                   placeholder="Example123"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//               </div>

//               <button type="submit" className="btn">
//                 {loading ? "Loading..." : "Sign Up with Email and Password"}
//               </button>
//             </form>
//             <p style={{ textAlign: "center", margin: 0 }}>or</p>
//             <button
//               disabled={loading}
//               className="btn btn-blue"
//               onClick={signInWithGoogle}
//             >
//               {loading ? "Loading..." : "Sign Up with Google"}
//             </button>
//             <p
//               onClick={() => setFlag(!flag)}
//               style={{
//                 textAlign: "center",
//                 marginBottom: 0,
//                 marginTop: "0.5rem",
//                 cursor: "pointer",
//               }}
//             >
//               Or Have An Account Already? Click Here
//             </p>
//             {/* <button onClick={signInWithEmail}>
//             Sign In with Email and Password
//           </button> */}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SignUpSignIn;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Header from "./Header";
import { toast } from "react-toastify";
import "./signup.css"; // Import the CSS file here

const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const createUserDocument = async (user) => {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("Account Created!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.error("Error creating user document: ", error);
        setLoading(false);
      }
    }
  };

  const signUpWithEmail = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      await createUserDocument(user);
      toast.success("Successfully Signed Up!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
      console.error(
        "Error signing up with email and password: ",
        error.message
      );
      setLoading(false);
    }
  };

  const signInWithEmail = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      navigate("/dashboard");
      toast.success("Logged In Successfully!");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.error(
        "Error signing in with email and password: ",
        error.message
      );
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserDocument(user);
      toast.success("User Authenticated Successfully!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="signup-wrapper">
        {flag ? (
          <>
            <h2 className="title">
              Log In on <span className="blue-text">Financely.</span>
            </h2>
            <form onSubmit={signInWithEmail}>
              <div className="input-wrapper">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={"johndoe@gmail.com"}
                />
              </div>
              <div className="input-wrapper">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"example123"}
                />
              </div>
              <button
                disabled={loading}
                onClick={signInWithEmail}
                className="btn btn-email"
              >
                {loading ? "Loading..." : "Log In with Email and Password"}
              </button>
            </form>
            <p className="p-login">or</p>
            <button
              disabled={loading}
              onClick={signInWithGoogle}
              className="btn btn-blue"
            >
              {loading ? "Loading..." : "Log In with Google"}
            </button>
            <p className="p-login" onClick={() => setFlag(!flag)}>
              Or Don't Have An Account?
              <span style={{ color: "black" }}> Click Here.</span>
            </p>
          </>
        ) : (
          <>
            <h2 className="title">
              Sign Up on <span className="blue-text">Financy</span>
            </h2>
            <form onSubmit={signUpWithEmail}>
              <div className="input-wrapper">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={"Enter your full name"}
                />
              </div>
              <div className="input-wrapper">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={"johndoe@gmail.com"}
                />
              </div>
              <div className="input-wrapper">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"Example123"}
                />
              </div>
              <div className="input-wrapper">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={"Confirm Password"}
                />
              </div>
              <button
                disabled={loading}
                onClick={signUpWithEmail}
                className="btn btn-email"
              >
                {loading ? "Loading..." : "Sign Up with Email and Password"}
              </button>
            </form>
            <p className="p">or</p>
            <button
              disabled={loading}
              onClick={signInWithGoogle}
              className="btn btn-blue"
            >
              {loading ? "Loading..." : "Sign Up with Google"}
            </button>
            <p className="p-login" onClick={() => setFlag(!flag)}>
              Already Have an Account?
              <span style={{ color: "black" }}> Log In</span>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default SignUpSignIn;
