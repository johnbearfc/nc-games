import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components';
import { getReviews } from '../utils/api';

const ReviewsList = styled.ul`
    list-style-type: none;
    margin: auto;
    padding: 0;
    width: 80%;
`

const ListItem = styled.div`
    background-color: lightgrey;
    margin-bottom: 20px;
    padding: 10px;

    img {
        max-width: 100%;
    }

    h3 {
        font-size: 1.2rem;
    }
`

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const { category_slug } = useParams();

    console.log(category_slug);

    useEffect(() => {
        getReviews(category_slug).then((reviewsFromApi) => {
            setReviews(reviewsFromApi);
        })
        window.scrollTo(0, 0);
    }, [category_slug])

    return (
        <ReviewsList>
            {reviews.map(review => {
                return (
                    <li key={review.review_id}>
                        <ListItem>
                            <h3>{review.title}</h3>
                            <img src={review.review_img_url} alt={review.title}/>
                            <p>{review.owner} | {review.category}</p>
                            <p>{review.votes} Votes | {review.comment_count} comments</p>
                        </ListItem>
                    </li>
                )
            })}
        </ReviewsList>
    )
}

export default Reviews
