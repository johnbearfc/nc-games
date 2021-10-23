import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/User";

const Wrapper = styled.section`
  .side-nav {
    background-color: #472d30;
    width: 50%;
    height: 100vh;
    position: fixed;
    top: 42px;
    right: -100%;
    transition: 0.7s;
    border-left: 2px solid #fffcf2;

    @media only screen and (min-width: 600px) {
      width: 20%;
    }

    @media only screen and (max-width: 600px) {
      width: 50%;
    }
  }

  .side-nav.active {
    right: 0;
    transition: 0.5s;
  }

  .account-list {
    text-transform: capitalize;
    padding: 0;
    margin: 0;
  }

  .nav-option {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    border-bottom: 1px solid #fffcf2;
  }
`;

const AccountOptions = ({ isOpen, toggleIsOpen }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Wrapper>
      <nav className={isOpen.accountToggle ? "side-nav active" : "side-nav"}>
        {!user ? (
          <ul className="account-list">
            <li className="nav-option">
              <Link
                to="/login"
                className="navbar-link"
                onClick={() => toggleIsOpen("accountToggle")}
              >
                Log In / Create Account
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="account-list">
            <li className="nav-option">
              <Link
                to={`/users/${user}`}
                className="navbar-link"
                onClick={() => toggleIsOpen("accountToggle")}
              >
                Profile
              </Link>
            </li>
            <li className="nav-option">
              <span
                className="navbar-link"
                onClick={() => {
                  toggleIsOpen("accountToggle");
                  setUser(null);
                  localStorage.removeItem("loggedInUser");
                }}
              >
                Log Out
              </span>
            </li>
          </ul>
        )}
      </nav>
    </Wrapper>
  );
};

export default AccountOptions;
