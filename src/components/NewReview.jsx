import { TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router";
import styled from "styled-components";
import { UserContext } from "../contexts/User";
import { postReview } from "../utils/api";

const Wrapper = styled.section`
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

  main {
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

  label {
    display: block;
    margin: 5px 0 5px 0;
  }

  button {
    margin: 5px 0 5px 0;
  }
`;

const NewReview = ({ err, setErr }) => {
  const [reviewInput, setReviewInput] = useState({
    title: "",
    review_body: "",
    designer: "",
    category: "",
  });
  const [newReviewId, setNewReviewId] = useState(null);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { categories } = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(null);

    postReview(reviewInput, user)
      .then((reviewIdFromApi) => {
        setNewReviewId(reviewIdFromApi);
      })
      .catch((err) => {
        setErr("Something went wrong :(");
      });

    setReviewInput({ title: "", review_body: "", designer: "", category: "" });
  };

  const handleInputChange = (input, field) => {
    setReviewInput((currReviewInput) => {
      const updatedInput = { ...currReviewInput };
      updatedInput[field] = input;
      return updatedInput;
    });
  };

  return (
    <Wrapper>
      <main>
        <h1>New Review</h1>
        {!user ? (
          <Redirect to="/login" />
        ) : (
          <h4>Hi {user}, what have you been playing?</h4>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <TextField
            className="input-field"
            size="small"
            required
            type="text"
            id="title"
            value={reviewInput.title}
            onChange={(e) => handleInputChange(e.target.value, "title")}
          />
          <label htmlFor="review">Review:</label>
          <TextField
            className="input-field"
            multiline
            rows={4}
            size="large"
            id="review"
            value={reviewInput.review_body}
            onChange={(e) => handleInputChange(e.target.value, "review_body")}
          />
          <label htmlFor="designer">Designer:</label>
          <TextField
            className="input-field"
            size="small"
            required
            type="text"
            id="designer"
            value={reviewInput.designer}
            onChange={(e) => handleInputChange(e.target.value, "designer")}
          />
          <label htmlFor="category">Category:</label>
          <select
            className="input-field"
            required
            id="category"
            value={reviewInput.category}
            onChange={(e) => handleInputChange(e.target.value, "category")}
          >
            <option value="" disabled hidden>
              --Select Category--
            </option>
            {categories.map((category) => {
              return <option key={category.slug}>{category.slug}</option>;
            })}
          </select>
          <button type="submit">Submit</button>
        </form>
        {err && <p>{err}</p>}
      </main>
      {newReviewId && <Redirect to={`/reviews/${newReviewId}`} />}
    </Wrapper>
  );
};

export default NewReview;
