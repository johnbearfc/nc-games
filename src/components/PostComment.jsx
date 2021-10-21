import React from 'react'
import styled from 'styled-components'

const CommentWrapper = styled.div`

    background-color: grey;
    width: 100%;
    
    @media only screen and (max-width: 600px) {
        position: fixed;
        bottom: 0;
        left: 0;
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

    return (
        <CommentWrapper id='comment-box' >
            <form>
                <label htmlFor='comment'/>
                <input type='text' id='comment' placeholder='comment...'/>
                <button>Post</button>
            </form>
        </CommentWrapper>
    )
}

export default PostComment
