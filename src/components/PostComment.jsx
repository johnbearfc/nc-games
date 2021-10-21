import React, { useContext } from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { UserContext } from '../contexts/User';
import { postComment } from '../utils/api';

const CommentWrapper = styled.div`

    background-color: grey;
    width: 100%;
    
    @media only screen and (max-width: 600px) {
        position: fixed;
        bottom: 0;
        left: 0;
        border-radius: 5px 5px 0 0;
    }

    form {
        padding: 10px;
        display: flex;   
    }
    input {
        width: 100%;
    }
`

const PostComment = ({ review_id }) => {
    const [commentInput, setCommentInput] = useState('');
    const { user } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // setErr(null);

        postComment(review_id, user.username, commentInput)
        // .catch((err) => {
        //     setErr('Something went wrong :(');
        // })

        setCommentInput('');
    }

    return (
        <CommentWrapper id='comment-box' >
            <form onSubmit={handleSubmit}>
                <label htmlFor='comment'/>
                <input 
                    required 
                    type='text' 
                    id='comment' 
                    placeholder={user ? 'comment...' : 'log in to comment'} 
                    disabled={!user}
                    onChange={(e) => {
                        setCommentInput(e.target.value);
                        // setErr(null);
                    }
                }
                />
                <button disabled={!user} type='submit'>Post</button>
            </form>
        </CommentWrapper>
    )
}

export default PostComment
