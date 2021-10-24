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

const BackgroundBlur = styled.div`
  .blurred {
    position: fixed;
    z-index: 1;
    background: white;
    filter: blur(500px);
    height: 100vh;
    width: 100%;
    pointer-events: none;
  }
  .not-blurred {
    position: fixed;
    z-index: 1;
    background: white;
    filter: blur(500px);
    height: 100vh;
    width: 100%;
    pointer-events: none;
  }
`;

const StyledNav = styled.nav`
  font-size: 1.2rem;
  width: 100%;

  #BQ-logo {
    font-family: "IM Fell English SC", serif;
    grid-area: g3;
    text-align: center;
    font-size: 1rem;
  }

  #reviews {
    grid-area: g1;
  }

  #new-review {
    grid-area: g5;
  }

  #account {
    grid-area: g6;
  }

  @media only screen and (min-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 3fr 1.5fr 3.2fr 0.5fr 0.5fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: "g1 . g3 . g5 g6";
  }

  @media only screen and (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1.75fr 3.5fr 1.75fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: "g1 . g3 . g5 g6";
  }
`;

const NavWrapper = styled.section`
  z-index: 2;
  background-color: #f7ede2;
  padding: 10px 15px 10px 15px;
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
  console.log(isOpen);
  return (
    <>
      <NavWrapper>
        <StyledNav>
          <span className="nav-link-w" id="reviews">
            {/* GiSpellBook */}
            <gi.GiRuleBook
              onClick={() => toggleIsOpen("categoryToggle", "accountToggle")}
            />
          </span>
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
            id="new-review"
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
            id="account"
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
      <BackgroundBlur>
        <div
          className={isOpen.categoryToggle ? "blurred" : "not-blurred"}
        ></div>
      </BackgroundBlur>
    </>
  );
};

export default Nav;
