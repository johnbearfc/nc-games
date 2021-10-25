import { TextField } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { UserContext } from "../contexts/User";
import { getUser, postUser } from "../utils/api";

const Wrapper = styled.section`
  background: #84a59d;
  margin: auto;
  padding: 40px 0 100vh 0;
  height: 100%;
  @media only screen and (min-width: 600px) {
    width: 70%;
  }

  -webkit-box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);
  box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);

  @media only screen and (max-width: 600px) {
    width: 100%;
  }

  main {
    @media only screen and (max-width: 600px) {
      margin: 10px;
      padding: 6px;
      -webkit-box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);
      box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);
    }
    border-radius: 5px;
    margin: 30px;
    padding: 10px;
    background: white;
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
  const [newUsernameInput, setNewUsernameInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleSignUp = (e) => {
    e.preventDefault();
    setErr(null);

    postUser(newUsernameInput, nameInput)
      .then((userFromApi) => {
        setUser(userFromApi.username);
        localStorage.setItem("loggedInUser", userFromApi.username);
      })
      .catch((err) => {
        setErr("Something went wrong :(");
      });

    setNewUsernameInput("");
    setNameInput("");
  };

  return (
    <Wrapper>
      <main>
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
      </main>
      <main>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <label htmlFor="username">Username:</label>
          <TextField
            className="input-field"
            variant="outlined"
            size="small"
            required
            type="text"
            id="username"
            value={newUsernameInput}
            onChange={(e) => {
              setNewUsernameInput(e.target.value);
              setErr(null);
            }}
          />
          <label htmlFor="name">Name:</label>
          <TextField
            className="input-field"
            variant="outlined"
            size="small"
            required
            type="text"
            id="name"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
              setErr(null);
            }}
          />
          <button type="submit">Sign Up</button>
        </form>
      </main>
    </Wrapper>
  );
};

export default LogIn;
