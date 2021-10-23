import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as gi from "react-icons/gi";
import * as fa from "react-icons/fa";
import { useState } from "react";
import Categories from "./Categories";
import AccountOptions from "./AccountOptions";
import { UserContext } from "../contexts/User";
import { getCategories } from "../utils/api";

const StyledNav = styled.nav`
  font-size: 1rem;
  width: 100%;

  #BQ-logo {
    font-family: "IM Fell English SC", serif;
  }

  @media only screen and (min-width: 600px) {
    display: inline-grid;
    grid-template-columns: 75% auto auto;
  }

  @media only screen and (max-width: 600px) {
    display: inline-grid;
    grid-template-columns: 65% auto auto;
  }
`;

const NavWrapper = styled.section`
  display: inline-grid;
  grid-template-columns: 10% auto;
  background-color: #f7ede2;
  padding: 15px 15px 15px 15px;
  width: 100%;
  position: fixed;
  top: 0;
  margin: 0 auto;
  left: 0;
  right: 0;
  border-bottom: 2px solid #252422;

  .nav-option {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    border-bottom: 1px solid #252422;
  }
`;

const Nav = () => {
  const [isOpen, setIsOpen] = useState({});
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categoriesFromApi) => {
      setCategories(categoriesFromApi);
    });
  }, []);

  const toggleIsOpen = (navOption, closeOption) =>
    setIsOpen((currToggle) => {
      const setToggle = { ...currToggle };

      setToggle[navOption] = !setToggle[navOption];
      setToggle[closeOption] = false;

      return setToggle;
    });

  return (
    <>
      <NavWrapper>
        <span className="nav-link-w">
          {/* GiSpellBook */}
          <gi.GiRuleBook
            onClick={() => toggleIsOpen("categoryToggle", "accountToggle")}
          />
        </span>
        <StyledNav>
          <Link
            id="BQ-logo"
            className="nav-link-w"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Board Quest
          </Link>
          <Link
            className="nav-link-w"
            to={
              !user
                ? "/login"
                : {
                    pathname: "/reviews/submit",
                    state: { categories },
                  }
            }
            onClick={() => setIsOpen(false)}
          >
            <gi.GiQuillInk />
          </Link>
          <span
            className="nav-link-w"
            onClick={() => toggleIsOpen("accountToggle", "categoryToggle")}
          >
            <fa.FaChessPawn />
          </span>
        </StyledNav>
        <AccountOptions isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        <Categories
          isOpen={isOpen}
          toggleIsOpen={toggleIsOpen}
          categories={categories}
        />
      </NavWrapper>
    </>
  );
};

export default Nav;
