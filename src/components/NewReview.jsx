import React, { useContext, useState } from 'react'
import { Redirect, useLocation } from 'react-router';
import styled from 'styled-components';
import { UserContext } from '../contexts/User';
import { postReview } from '../utils/api';

const Wrapper = styled.section`
    margin: 60px auto;
    width: 80%;

    label {
        display: block;
    }
`;

const NewReview = ({ err, setErr }) => {
    const [reviewInput, setReviewInput] = useState({ title: '',  review_body: '', designer: '', category: '' });
    const [newReviewId, setNewReviewId] = useState(null);
    const { user } = useContext(UserContext);
    const location = useLocation();
    const { categories } = location.state;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErr(null);
        
        postReview(reviewInput, user.username).then((reviewIdFromApi) => {
            setNewReviewId(reviewIdFromApi);
        })
        .catch((err) => {
            setErr('Something went wrong :(');
        })

        setReviewInput({ title: '',  review_body: '', designer: '', category: '' });
    }

    const handleInputChange = (input, field) => {
        setReviewInput((currReviewInput) => {
            const updatedInput = {...currReviewInput};
            updatedInput[field] = input;
            return updatedInput;
        })
    }

    return (
        <Wrapper>
            <h1>New Review</h1>
            {
            !user ?
                <Redirect to='/login'/>
                :
                <h4>Hi {user.username}, what have you been playing?</h4>
            }
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title:</label>
                <input 
                    required 
                    type='text' 
                    id='title' 
                    value={reviewInput.title}
                    onChange={(e) => handleInputChange(e.target.value, 'title')}
                />
                <label htmlFor='review'>Review:</label>
                <input 
                    required 
                    type='text' 
                    id='review'
                    value={reviewInput.review_body} 
                    onChange={(e) => handleInputChange(e.target.value, 'review_body')}

                />
                <label htmlFor='designer'>Designer:</label>
                <input 
                    required 
                    type='text' 
                    id='designer' 
                    value={reviewInput.designer} 
                    onChange={(e) => handleInputChange(e.target.value, 'designer')}
                />
                <label htmlFor='category'>Category:</label>
                <select 
                    required 
                    id='category' 
                    value={reviewInput.category} 
                    onChange={(e) => handleInputChange(e.target.value, 'category')}
                >
                        <option value='' disabled hidden>--Select Category--</option>
                        {categories.map(category => {
                            return (
                                <option key={category.slug}>
                                    {category.slug}
                                </option>
                            )
                        })}
                </select>
                <button type='submit'>Submit</button>
            </form>
            {err && <p>{err}</p>}
            {newReviewId && <Redirect to={`/reviews/${newReviewId}`} />}
        </Wrapper>
    )
}

export default NewReview
