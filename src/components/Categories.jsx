import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.section`
  .side-nav {
    background: #f7ede2;
    border-right: 2px solid #252422;
    width: 50%;
    height: 100vh;
    position: fixed;
    top: 45px;
    left: -100%;
    transition: 0.7s;

    @media only screen and (min-width: 600px) {
      width: 20%;
    }

    @media only screen and (max-width: 600px) {
      width: 50%;
    }
  }

  .side-nav.active {
    left: 0;
    transition: 0.5s;
  }

  .category-list {
    text-transform: capitalize;
    padding: 0;
    margin: 0;
  }
`;

const Categories = ({ isOpen, toggleIsOpen, categories }) => {
  return (
    <Wrapper>
      <nav className={isOpen.categoryToggle ? "side-nav active" : "side-nav"}>
        <ul className="category-list">
          <li className="nav-option">
            <Link
              to={"/reviews/"}
              className="nav-link-w"
              onClick={() => toggleIsOpen("categoryToggle")}
            >
              All
            </Link>
          </li>
          {categories.map((category) => {
            return (
              <li className="nav-option" key={category.slug}>
                <Link
                  to={`/reviews?category=${category.slug}`}
                  className="nav-link-w"
                  onClick={() => toggleIsOpen("categoryToggle")}
                >
                  {category.slug}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Wrapper>
  );
};

export default Categories;
