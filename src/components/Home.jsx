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
    font-size: 2.5rem;
    line-height: 0;

    width: 80%;
    margin: auto;
    padding-top: 96px;
    padding-bottom: 25px;
    text-align: center;

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
    width: 80%;
    margin: auto;
    border: 1px solid;
    border-radius: 5px;
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
        <h1 id="board">Board</h1>
        <h1 id="quest">Quest</h1>
        <Link
          className="nav-link"
          to={`/reviews/${Math.ceil(
            Math.random() * Number(reviewData.total_count)
          )}`}
        >
          <gi.GiPerspectiveDiceSixFacesThree />
        </Link>
        {user && <p id="welcome-message">Welcome, {user}</p>}
      </header>
      <section className="featured-reviews">
        <h2>Featured Reviews:</h2>
        <p>{loading && "Loading..."}</p>
        <p>{err && err}</p>
        <ReviewsList reviewData={reviewData} />
      </section>
    </Wrapper>
  );
};

export default Home;
