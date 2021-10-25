import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { deleteReview, getSingleReview, patchReviewVotes } from "../utils/api";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import styled from "styled-components";
import ReviewComments from "./ReviewComments";
import * as cg from "react-icons/cg";
import * as fa from "react-icons/fa";
import { UserContext } from "../contexts/User";
import { IconButton } from "@mui/material";

const ReviewWrapper = styled.section`
  background: #84a59d;
  margin: auto;
  padding: 40px 0 40px 0;
  height: 100%;
  @media only screen and (min-width: 600px) {
    width: 70%;
  }

  -webkit-box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);
  box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);

  @media only screen and (max-width: 600px) {
    width: 100%;
  }

  .review-section {
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

  h1 {
    font-size: 2rem;
  }

  img {
    max-width: 100%;
    border-radius: 5px;
  }

  h3 {
    font-size: 1.2rem;
  }

  .votes:hover,
  .voted:hover {
    color: white;
    background-color: #bf4f47;
    border: 1px solid #bf4f47;
  }

  .votes {
    position: static;
    border-radius: 5px;
    border: 1px solid;
    margin: 5px;
    text-align: center;
    -webkit-box-shadow: 0px 10px 13px -7px #000000,
      5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  }
  .voted {
    position: static;
    color: white;
    background-color: #bf4f47;
    border-radius: 5px;
    border: 1px solid #bf4f47;
    margin: 5px;
    text-align: center;
    -webkit-box-shadow: 0px 10px 13px -7px #000000,
      5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  }
`;

const SelectedReview = ({ loading, setLoading, err, setErr }) => {
  const [review, setReview] = useState({});
  const [reviewVoteChange, setReviewVoteChange] = useState(false);
  const [reviewDeleted, setReviewDeleted] = useState(false);
  const { review_id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setErr(null);
    setLoading(true);

    let isMounted = true;

    getSingleReview(review_id)
      .then((reviewFromApi) => {
        if (isMounted) {
          setReview(reviewFromApi);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setLoading(false);
          if (err.response.status === 404) setErr("Review not found");
          else setErr("Something went wrong :(");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [review_id, setErr, setLoading]);

  const handleReviewVote = (e) => {
    e.preventDefault();
    if (!user) alert("log in to vote");
    else {
      setReviewVoteChange(true);
      patchReviewVotes(review_id);
    }
  };

  const handleDeleteReview = () => {
    deleteReview(review_id).then(() => {
      setReviewDeleted(true);
    });
  };

  if (err || loading) {
    return (
      <ReviewWrapper>
        <p>{err || "Loading..."}</p>
      </ReviewWrapper>
    );
  }

  if (reviewDeleted) {
    return (
      <ReviewWrapper>
        <p>Review Deleted!</p>
      </ReviewWrapper>
    );
  }

  return (
    <ReviewWrapper>
      <section className="review-section">
        <h1>{review.title}</h1>
        <img src={review.review_img_url} alt={review.title} />
        <p className="review-info">
          <Link to={`/users/${review.owner}`} className="review-info">
            <fa.FaChessPawn />
            {review.owner} |{" "}
          </Link>
          <Link
            className="review-info"
            to={`/reviews?category=${review.category}`}
          >
            {review.category}{" "}
          </Link>{" "}
          | {DateTime.fromISO(review.created_at).toLocaleString()}
        </p>
        <p className="review-body">{review.review_body}</p>

        <IconButton
          aria-label="delete"
          onClick={handleReviewVote}
          className={reviewVoteChange ? "voted" : "votes"}
        >
          <cg.CgCardHearts />
          {review.votes + (reviewVoteChange ? 1 : 0)}
        </IconButton>

        {user && review.owner === user ? (
          <button onClick={handleDeleteReview}>Delete</button>
        ) : null}
        <ReviewComments
          review_id={review_id}
          commentCount={review.comment_count}
        />
      </section>
    </ReviewWrapper>
  );
};

export default SelectedReview;
