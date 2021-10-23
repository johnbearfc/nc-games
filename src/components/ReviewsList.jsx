import { DateTime } from "luxon";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as fa from "react-icons/fa";
import * as cg from "react-icons/cg";

const Wrapper = styled.section`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.div`
  background-color: #84a59d;
  color: #252422;

  margin-bottom: 20px;
  border-radius: 5px;

  .item-text {
    padding: 5px;
  }

  -webkit-box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);
  box-shadow: -5px 10px 19px -3px rgba(37, 36, 34, 0.46);

  img {
    max-width: 100%;
    border-radius: 5px 5px 0 0;
  }

  h3 {
    font-size: 1.2rem;
  }
`;

const ReviewsList = ({ reviewData, currentCategory }) => {
  return (
    <Wrapper>
      {reviewData.reviews.map((review) => {
        return (
          <li key={review.review_id}>
            <ListItem>
              <Link className="nav-link-w" to={`/reviews/${review.review_id}`}>
                <img src={review.review_img_url} alt={review.title} />
              </Link>
              <section className="item-text">
                <Link
                  className="nav-link-w"
                  to={`/reviews/${review.review_id}`}
                >
                  <h3>{review.title}</h3>
                </Link>
                <p>
                  <Link className="nav-link-w" to={`/users/${review.owner}`}>
                    {review.owner} |{" "}
                  </Link>
                  {DateTime.fromISO(review.created_at).toLocaleString()}
                </p>
                <p>
                  {!currentCategory && (
                    <Link
                      className="nav-link-w"
                      to={`/reviews?category=${review.category}`}
                    >
                      {review.category}
                    </Link>
                  )}
                </p>
                <p>
                  <cg.CgCardHearts />
                  {review.votes} | <fa.FaRegComments />
                  {review.comment_count}
                </p>
              </section>
            </ListItem>
          </li>
        );
      })}
    </Wrapper>
  );
};

export default ReviewsList;
