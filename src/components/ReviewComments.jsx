import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getComments } from '../utils/api';
import PostComment from './PostComment';
import SingleComment from './SingleComment';

const CommentsWrapper = styled.section`

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

    useEffect(() => {
        getComments(review_id).then((commentsFromApi) => {
            setComments(commentsFromApi);
        })
    }, [review_id]);

    return (
        <CommentsWrapper>
            <PostComment review_id={review_id}/>
            <h3>Comments ({commentCount})</h3>
            <ul>
                {comments.map(comment => {
                    return (
                        <li key={comment.comment_id}>
                            <SingleComment comment={comment}/>
                        </li>
                    )
                })}
            </ul>
        </CommentsWrapper>
    )
}

export default ReviewComments
