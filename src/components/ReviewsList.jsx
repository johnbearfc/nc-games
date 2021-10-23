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
  background-color: lightgrey;
  margin-bottom: 20px;
  padding: 10px;

  img {
    max-width: 100%;
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
              <h3>
                <Link to={`/reviews/${review.review_id}`}>{review.title}</Link>
              </h3>
              <img src={review.review_img_url} alt={review.title} />
              <p>
                {review.owner} |{" "}
                {DateTime.fromISO(review.created_at).toLocaleString()}
              </p>
              <p>
                {!currentCategory && (
                  <Link to={`/reviews?category=${review.category}`}>
                    {review.category}
                  </Link>
                )}
              </p>
              <p>
                <cg.CgCardHearts />
                {review.votes} | <fa.FaRegComments />
                {review.comment_count}
              </p>
            </ListItem>
          </li>
        );
      })}
    </Wrapper>
  );
};

export default ReviewsList;
