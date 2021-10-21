import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getComments } from '../utils/api';
import PostComment from './PostComment';

const CommentsWrapper = styled.section`

    ul {
        list-style: none;
        padding: 10px;
    }

    li {
        border-top: 1px solid;
    }

    .comment-body {
        padding: 5px;
        background-color: white;
    }
`

const ReviewComments = ({ review_id }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(review_id).then((commentsFromApi) => {
            setComments(commentsFromApi);
        })
    }, [review_id]);

    return (
        <CommentsWrapper>
            <PostComment review_id={review_id}/>
            <ul>
                {comments.map(comment => {
                    return (
                        <li key={comment.comment_id}>
                            <p>{comment.author}</p> 
                            <p>{comment.created_at}</p> 
                            <p className='comment-body'>{comment.body}</p> 
                            <p>Votes: {comment.votes}</p> 
                        </li>
                    )
                })}
            </ul>
        </CommentsWrapper>
    )
}

export default ReviewComments
