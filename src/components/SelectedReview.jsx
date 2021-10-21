import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSingleReview } from '../utils/api';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import ReviewComments from './ReviewComments';

const ReviewWrapper = styled.section`
    background-color: lightgrey;
    margin: 50px 0 20px 0;
    
    .review-section {
        padding: 10px;
    }

    img {
        max-width: 100%;
    }

    h3 {
        font-size: 1.2rem;
    }

    .review-body {
        background-color: white;
        padding: 5px;
    }
`;

const SelectedReview = () => {
    const [review, setReview] = useState({});
    const { review_id } = useParams();

    useEffect(() => {
        getSingleReview(review_id).then((reviewFromApi) => {
            setReview(reviewFromApi);
        })
    }, [review_id]);

    return (
        <ReviewWrapper>
            <section className='review-section'>
                <h1>{review.title}</h1>
                <img src={review.review_img_url} alt={review.title}/>
                <p>{review.owner} | {DateTime.fromISO(review.created_at).toLocaleString()}</p>
                <p><Link to={`/reviews?category=${review.category}`}>{review.category}</Link></p>
                <p className='review-body'>{review.review_body}</p>
                <p>{review.votes} Votes | {review.comment_count} comments</p>
            <ReviewComments review_id={review_id}/>
            </section>
        </ReviewWrapper>
    );
}

export default SelectedReview;
