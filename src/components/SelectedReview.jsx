import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { deleteReview, getSingleReview, patchReviewVotes } from "../utils/api";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import styled from "styled-components";
import ReviewComments from "./ReviewComments";
import * as cg from "react-icons/cg";
import { UserContext } from "../contexts/User";

const ReviewWrapper = styled.section`
  margin: 50px 0 20px 0;

  .review-section {
    padding: 10px;
  }

  img {
    max-width: 100%;
  }

  h3 {
    font-size: 1.2rem;
  }

  .review-body {
    background-color: white;
    padding: 5px;
  }

  .votes {
    border: 1px solid;
    border-radius: 5px;
    padding: 5px;
    width: 20%;
    margin-left: 80%;
    text-align: center;
  }
`;

const SelectedReview = ({ loading, setLoading, err, setErr }) => {
  const [review, setReview] = useState({});
  const [reviewVoteChange, setReviewVoteChange] = useState(0);
  const [reviewDeleted, setReviewDeleted] = useState(false);
  const { review_id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setErr(null);

    getSingleReview(review_id)
      .then((reviewFromApi) => {
        setReview(reviewFromApi);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 404) setErr("Review not found");
        else setErr("Something went wrong :(");
      });
  }, [review_id, setErr, setLoading]);

  const handleReviewVote = (e) => {
    e.preventDefault();
    if (!user) alert("log in to vote");
    else {
      setReviewVoteChange((currVoteChange) => currVoteChange + 1);
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
        <p>
          {review.owner} |{" "}
          {DateTime.fromISO(review.created_at).toLocaleString()}
        </p>
        <p>
          <Link to={`/reviews?category=${review.category}`}>
            {review.category}
          </Link>
        </p>
        <p className="review-body">{review.review_body}</p>

        <button className="votes" onClick={handleReviewVote}>
          <cg.CgCardHearts />
          {review.votes + reviewVoteChange}
        </button>

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
