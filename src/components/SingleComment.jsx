import React, { useContext } from 'react';
import { DateTime } from 'luxon';
import * as cg from 'react-icons/cg';
import { useState } from 'react';
import { UserContext } from '../contexts/User';
import { deleteComment, patchCommentVotes } from '../utils/api';

const SingleComment = ({ comment }) => {
    const [commentVoteChange, setCommentVoteChange] = useState(0);
    const { user } = useContext(UserContext);

    const handleCommentVote = (e) => {
        e.preventDefault()
        if (!user) alert('log in to vote');
        else {
            setCommentVoteChange((currVoteChange) => currVoteChange + 1);
            patchCommentVotes(comment.comment_id);
        }
    }

    const handleDeleteComment = () => {
        deleteComment(comment.comment_id);
    }

    return (
        <div>
            <p>{comment.author}</p> 
            <p>{DateTime.fromISO(comment.created_at).toLocaleString(DateTime.DATETIME_FULL)}</p> 
            <p className='comment-body'>{comment.body}</p> 
            {user && comment.author === user.username ? <button onClick={handleDeleteComment}>Delete</button> : null}
            <button className='votes' onClick={handleCommentVote}><cg.CgCardHearts/>{comment.votes + commentVoteChange}</button> 
        </div>
    )
}

export default SingleComment
