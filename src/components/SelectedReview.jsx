import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSingleReview } from '../utils/api';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import styled from 'styled-components';

const ReviewWrapper = styled.div`
    background-color: lightgrey;
    margin: 50px 0 20px 0;
    padding: 10px;

    img {
        max-width: 100%;
    }

    h3 {
        font-size: 1.2rem;
    }
`;

const SelectedReview = () => {
    const [review, setReview] = useState({});
    const { review_id } = useParams();

    useEffect(() => {
        getSingleReview(review_id).then((reviewFromApi) => {
            setReview(reviewFromApi);
        })
    });

    return (
        <ReviewWrapper>
            <h1>{review.title}</h1>
            <img src={review.review_img_url} alt={review.title}/>
            <p>{review.owner} | {DateTime.fromISO(review.created_at).toLocaleString()}</p>
            <p><Link to={`/reviews?category=${review.category}`}>{review.category}</Link></p>
            <p>{review.review_body}</p>
            <p>{review.votes} Votes | {review.comment_count} comments</p>
        </ReviewWrapper>
    );
}

export default SelectedReview;
