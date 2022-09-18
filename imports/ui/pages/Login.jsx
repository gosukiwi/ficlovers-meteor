import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, (err) => {
      setPassword("");
      if (err) {
        setError(
          "Could not find an user with that username and password combination."
        );
      } else {
        navigate("/");
      }
    });
  };

  return (
    <form onSubmit={submit} className="login-form">
      <p>{error}</p>

      <label htmlFor="username">Username</label>

      <input
        type="text"
        placeholder="Username"
        name="username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password</label>

      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Log In</button>
    </form>
  );
}
