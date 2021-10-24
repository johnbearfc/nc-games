import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import * as gi from "react-icons/gi";
import { getReviews } from "../utils/api";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";
import ReviewsList from "./ReviewsList";

const Wrapper = styled.section`
  header {
    font-family: "IM Fell English SC", serif;
    font-size: 3.5rem;
    line-height: 0;
    background-color: #84a59d;

    -webkit-box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);
    box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);

    border-radius: 0 0 15px 15px;

    margin-bottom: 30px;
    padding-bottom: 25px;
    text-align: center;
    padding-top: 50px;

    #dice {
    }

    #board {
      padding-right: 30px;
    }

    #quest {
      padding-left: 30px;
    }
  }

  #welcome-message {
    font-size: 1rem;
    line-height: 1;
  }

  .featured-reviews {
    @media only screen and (min-width: 600px) {
      width: 55%;
    }

    @media only screen and (max-width: 600px) {
      width: 80%;
    }

    margin: auto;
    padding: 5px;
  }
`;

const Home = ({
  reviewData,
  setReviewData,
  loading,
  setLoading,
  err,
  setErr,
}) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    setErr(null);

    getReviews("?limit=3")
      .then((reviewsFromApi) => {
        setReviewData(reviewsFromApi);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErr("Something went wrong :(");
      });

    window.scrollTo(0, 0);
  }, [setReviewData, setErr, setLoading]);

  return (
    <Wrapper>
      <header>
        {user && <p id="welcome-message">Welcome, {user}</p>}
        <h1 id="board">Board</h1>
        <h1 id="quest">Quest</h1>
        <Link
          className="nav-link"
          id="dice"
          to={`/reviews/${Math.ceil(
            Math.random() * (Number(reviewData.total_count) - 1)
          )}`}
        >
          <gi.GiPerspectiveDiceSixFacesThree />
        </Link>
      </header>
      <section className="featured-reviews">
        <h2>Featured Reviews</h2>
        <p>{loading && "Loading..."}</p>
        <p>{err && err}</p>
        <ReviewsList reviewData={reviewData} />
      </section>
    </Wrapper>
  );
};

export default Home;
