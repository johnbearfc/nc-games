import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getComments } from "../utils/api";
import PostComment from "./PostComment";
import SingleComment from "./SingleComment";

const CommentsWrapper = styled.section`
  margin-bottom: 40px;

  ul {
    list-style: none;
    padding: 10px;
  }

  li {
    border-top: 1px solid;
    margin: 5px 0 5px 0;
  }

  .comment-body {
    padding: 5px;
    background-color: white;
  }
`;

const ReviewComments = ({ review_id, commentCount }) => {
  const [comments, setComments] = useState([]);
  const [commentsExtended, setCommentsExtended] = useState(false);
  const [commentCountChange, setCommentCountChange] = useState(0);

  useEffect(() => {
    getComments(review_id, commentsExtended).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [review_id, commentsExtended]);

  return (
    <CommentsWrapper>
      <PostComment
        review_id={review_id}
        setComments={setComments}
        setCommentCountChange={setCommentCountChange}
      />
      <h3>Comments ({commentCount + commentCountChange})</h3>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <SingleComment
                review_id={review_id}
                comment={comment}
                setComments={setComments}
                setCommentCountChange={setCommentCountChange}
              />
            </li>
          );
        })}
      </ul>
      {commentCount + commentCountChange > 10 && (
        <button onClick={() => setCommentsExtended(!commentsExtended)}>
          {commentsExtended ? "show less" : "show more"}
        </button>
      )}
    </CommentsWrapper>
  );
};

export default ReviewComments;
