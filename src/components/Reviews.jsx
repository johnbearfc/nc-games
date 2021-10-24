import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { getReviews } from "../utils/api";
import { Link } from "react-router-dom";
import * as fa from "react-icons/fa";
import * as cg from "react-icons/cg";
import { pagination } from "../utils/pagination";
import ReviewsList from "./ReviewsList";

const ReviewsWrapper = styled.section`
  margin: auto;
  padding-top: 40px;
  @media only screen and (min-width: 600px) {
    width: 55%;
  }

  @media only screen and (max-width: 600px) {
    width: 80%;
  }

  h1 {
    text-transform: capitalize;
    text-align: center;
    margin-bottom: 0;
  }

  .sort-list {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 10px;
  }

  .sort-item {
    text-decoration: none;
  }
`;

const Reviews = ({
  reviewData,
  setReviewData,
  loading,
  setLoading,
  err,
  setErr,
}) => {
  const [page, setPage] = useState(1);
  const { search } = useLocation();
  const currentParams = new URLSearchParams(search);
  const currentPage = currentParams.get("p");
  const currentCategory = currentParams.get("category");

  useEffect(() => {
    setErr(null);
    setPage(currentPage || 1);

    getReviews(search)
      .then((reviewsFromApi) => {
        setReviewData(reviewsFromApi);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 404) setErr("Category not found");
        else setErr("Something went wrong :(");
      });

    window.scrollTo(0, 0);
  }, [search, page, currentPage, setReviewData, setLoading, setErr]);

  if (err) {
    return (
      <ReviewsWrapper>
        <p>{err}</p>
      </ReviewsWrapper>
    );
  }

  return (
    <ReviewsWrapper>
      <Link
        className="nav-link"
        to={currentCategory ? `?category=${currentCategory}` : "/reviews"}
      >
        <h1>{currentCategory || "All"}</h1>
      </Link>
      <ul className="sort-list">
        <li>
          <Link
            className="sort-item nav-link"
            to={`?${
              currentCategory ? `category=${currentCategory}&` : ""
            }sort_by=created_at&order=DESC`}
          >
            <fa.FaRegCalendarAlt />
            <fa.FaLongArrowAltDown />
          </Link>
        </li>
        <li>
          <Link
            className="sort-item nav-link"
            to={`?${
              currentCategory ? `category=${currentCategory}&` : ""
            }sort_by=created_at&order=ASC`}
          >
            <fa.FaRegCalendarAlt />
            <fa.FaLongArrowAltUp />
          </Link>
        </li>
        <li>
          <Link
            className="sort-item nav-link"
            to={`?${
              currentCategory ? `category=${currentCategory}&` : ""
            }sort_by=votes&order=DESC`}
          >
            <cg.CgCardHearts />
          </Link>
        </li>
        <li>
          <Link
            className="sort-item nav-link"
            to={`?${
              currentCategory ? `category=${currentCategory}&` : ""
            }sort_by=comment_count&order=DESC`}
          >
            <fa.FaRegComments />
          </Link>
        </li>
      </ul>
      <p>{loading && "Loading..."}</p>
      <ReviewsList reviewData={reviewData} currentCategory={currentCategory} />
      {reviewData.total_count > 10
        ? pagination(search, page, reviewData)
        : null}
    </ReviewsWrapper>
  );
};

export default Reviews;
