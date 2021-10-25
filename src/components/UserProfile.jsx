import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { getUser } from "../utils/api";

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

  img {
    max-width: 80%;
    border: 1px solid #252422;
    border-radius: 15px;
    -webkit-box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);
    box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);
  }
`;

export const UserProfile = () => {
  const { username } = useParams();
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getUser(username).then((userFromApi) => {
      setSelectedUser(userFromApi);
    });
  });
  return (
    <Wrapper>
      <main>
        <h1>{selectedUser.username}</h1>
        <img src={selectedUser.avatar_url} alt={selectedUser.username} />
      </main>
    </Wrapper>
  );
};
