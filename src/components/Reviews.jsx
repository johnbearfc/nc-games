import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components';
import { getReviews } from '../utils/api';

const ReviewsWrapper = styled.section`
    margin: 60px auto;
    width: 80%;

    h1 {
        text-transform: capitalize;
    }
`

const ReviewsList = styled.ul`
    list-style-type: none;
    padding: 0;
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
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const { category_slug } = useParams();

    console.log(category_slug);

    useEffect(() => {
        setErr(null);

        getReviews(category_slug).then((reviewsFromApi) => {
            setReviews(reviewsFromApi);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            if (err.response.status === 404) setErr('Category not found');
            else setErr('Something went wrong :(');
        });
        
        window.scrollTo(0, 0);
    }, [category_slug]);

    if (err) {
        return (
            <ReviewsWrapper>
                <p>{err}</p>
            </ReviewsWrapper>
        )
    }

    return (
        <ReviewsWrapper>
            <h1>{category_slug || 'All'}</h1>
            <p>{loading && 'Loading...'}</p>
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
        </ReviewsWrapper>
    )
}

export default Reviews
