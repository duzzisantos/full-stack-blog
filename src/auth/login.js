import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
 
} from "./firebase";
// import { signInWithFacebook } from "./facebook-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "../App.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard/blog");
  });
  return (
    <div className="login">
      <div className="login-container">
        <h3>Login</h3>
        <label htmlFor="login-email">Email</label>
        <input
          type="text"
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login-btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="google" onClick={signInWithGoogle}></button>
        <span className="login-span">
          <Link to="reset" className="links">
            Forgot Password?
          </Link>
        </span>
        <span className="login-span">
          <Link to="register" className="links">
            Do not have an account?
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
