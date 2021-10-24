import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getComments } from "../utils/api";
import PostComment from "./PostComment";
import SingleComment from "./SingleComment";
import { TransitionGroup } from "react-transition-group";
import { Collapse } from "@mui/material";

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
  }
`;

const ReviewComments = ({ review_id, commentCount }) => {
  const [comments, setComments] = useState([]);
  const [commentsExtended, setCommentsExtended] = useState(false);
  const [commentCountChange, setCommentCountChange] = useState(0);

  useEffect(() => {
    let isMounted = true;

    getComments(review_id, commentsExtended).then((commentsFromApi) => {
      if (isMounted) setComments(commentsFromApi);
    });

    return () => {
      isMounted = false;
    };
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
        <TransitionGroup>
          {comments.map((comment) => {
            return (
              <Collapse key={comment.comment_id}>
                <li>
                  <SingleComment
                    review_id={review_id}
                    comment={comment}
                    setComments={setComments}
                    setCommentCountChange={setCommentCountChange}
                  />
                </li>
              </Collapse>
            );
          })}
        </TransitionGroup>
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
