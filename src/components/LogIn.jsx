import { TextField } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { UserContext } from "../contexts/User";
import { getUser } from "../utils/api";

const Wrapper = styled.section`
  margin: auto;
  padding: 40px 40px 100vh 40px;
  height: 100%;
  background: #84a59d;

  -webkit-box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);
  box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);

  @media only screen and (min-width: 600px) {
    width: 50%;
  }

  label {
    display: block;
  }

  button {
    margin: 5px 0 5px 0;
  }
`;

const LogIn = ({ err, setErr }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(null);

    getUser(usernameInput)
      .then((userFromApi) => {
        setUser(userFromApi.username);
        localStorage.setItem("loggedInUser", userFromApi.username);
      })
      .catch((err) => {
        if (err.response.status === 404) setErr("User not found");
        else setErr("Something went wrong :(");
      });

    setUsernameInput("");
  };

  return (
    <Wrapper>
      <h2>Log In</h2>
      <p>(test user: jessjelly)</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <TextField
          className="input-field"
          variant="outlined"
          size="small"
          required
          type="text"
          id="username"
          value={usernameInput}
          onChange={(e) => {
            setUsernameInput(e.target.value);
            setErr(null);
          }}
        />
        <button type="submit">Log In</button>
        {err && <p>{err}</p>}
        {user && <Redirect to="/" />}
      </form>
    </Wrapper>
  );
};

export default LogIn;
