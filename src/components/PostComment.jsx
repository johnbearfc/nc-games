import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/User";
import { getComments, postComment } from "../utils/api";

const CommentWrapper = styled.div`
  background-color: #5a736d;
  width: 100%;
  border-radius: 5px;

  margin-top: 10px;

  @media only screen and (max-width: 600px) {
    margin-top: 0px;
    position: fixed;
    bottom: 0;
    left: 0;
    border-radius: 5px 5px 0 0;
  }

  form {
    padding: 10px;
    display: flex;
  }

  .className {
    white
  }

  
`;

const PostComment = ({ review_id, setComments, setCommentCountChange }) => {
  const [commentInput, setCommentInput] = useState("");
  const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErr(null);

    postComment(review_id, user, commentInput)
      .then(() => {
        return getComments(review_id);
      })
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
        setCommentCountChange((currCountChange) => currCountChange + 1);
      });
    setCommentInput("");
    // .catch((err) => {
    //     setErr('Something went wrong :(');
    // })
  };

  return (
    <CommentWrapper id="comment-box">
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment" />
        <TextField
          className="input-field"
          size="small"
          id="comment"
          variant="outlined"
          placeholder={user ? "comment..." : "log in to comment"}
          disabled={!user}
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Button
          variant="contained"
          disabled={!user}
          className="post-b"
          type="submit"
        >
          Post
        </Button>
      </form>
    </CommentWrapper>
  );
};

export default PostComment;
