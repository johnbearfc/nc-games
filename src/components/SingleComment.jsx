import React, { useContext } from "react";
import { DateTime } from "luxon";
import * as cg from "react-icons/cg";
import * as fa from "react-icons/fa";
import { useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteComment, getComments, patchCommentVotes } from "../utils/api";
import { IconButton } from "@mui/material";

const SingleComment = ({
  comment,
  setComments,
  review_id,
  setCommentCountChange,
}) => {
  const [commentVoteChange, setCommentVoteChange] = useState(false);
  const { user } = useContext(UserContext);

  const handleCommentVote = (e) => {
    e.preventDefault();
    if (!user) alert("log in to vote");
    else {
      setCommentVoteChange(true);
      patchCommentVotes(comment.comment_id);
    }
  };

  const handleDeleteComment = () => {
    deleteComment(comment.comment_id)
      .then(() => {
        return getComments(review_id);
      })
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
        setCommentCountChange((currCountChange) => currCountChange - 1);
      });
  };

  return (
    <div>
      <p>
        <fa.FaChessPawn />
        {comment.author}
      </p>
      <p>
        {DateTime.fromISO(comment.created_at).toLocaleString(
          DateTime.DATETIME_FULL
        )}
      </p>
      <p className="comment-body">{comment.body}</p>
      <IconButton
        aria-label="delete"
        onClick={handleCommentVote}
        className={commentVoteChange ? "voted" : "votes"}
        size="small"
      >
        <cg.CgCardHearts />
        {comment.votes + (commentVoteChange ? 1 : 0)}
      </IconButton>
      {user && comment.author === user ? (
        <button onClick={handleDeleteComment}>Delete</button>
      ) : null}
    </div>
  );
};

export default SingleComment;
