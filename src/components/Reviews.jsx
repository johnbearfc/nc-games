import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { getReviews } from '../utils/api';
import { Link } from 'react-router-dom';
import * as fa from 'react-icons/fa';
import { DateTime } from 'luxon';
import { pagination } from '../utils/pagination';

const ReviewsWrapper = styled.section`
    margin: 60px auto;
    width: 80%;

    h1 {
        text-transform: capitalize;
        text-align: center;
        margin-bottom: 0;
    }

    .sort-list {
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        list-style: none;
        margin: 0;
        padding: 10px;
    }
    
    .sort-item {
        text-decoration: none;
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

const Reviews = ({ reviewData, setReviewData }) => {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [page, setPage] = useState(1);
    const { search } = useLocation();
    const currentParams = new URLSearchParams(search);
    const currentPage = currentParams.get('p');
    const currentCategory = currentParams.get('category');

    useEffect(() => {
        setErr(null);
        setPage(currentPage || 1);

        getReviews(search).then((reviewsFromApi) => {
            setReviewData(reviewsFromApi);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            if (err.response.status === 404) setErr('Category not found');
            else setErr('Something went wrong :(');
        });

        window.scrollTo(0, 0);
    }, [search, page, currentPage, setReviewData]);

    if (err) {
        return (
            <ReviewsWrapper>
                <p>{err}</p>
            </ReviewsWrapper>
        );
    }

    return (
        <ReviewsWrapper>
            <Link to={currentCategory ? `?category=${currentCategory}` : '/reviews'}>
                <h1>{currentCategory || 'All'}</h1>
            </Link>
            <ul className='sort-list'>
                <li>
                    <Link className='sort-item' to={`?${currentCategory ? `category=${currentCategory}&` : ''}sort_by=created_at&order=DESC`}>
                        <fa.FaRegCalendarAlt/><fa.FaLongArrowAltDown/>
                    </Link>
                </li>
                <li>
                    <Link className='sort-item' to={`?${currentCategory ? `category=${currentCategory}&` : ''}sort_by=created_at&order=ASC`}>
                        <fa.FaRegCalendarAlt/><fa.FaLongArrowAltUp/>
                    </Link>
                </li>
                <li>
                    <Link className='sort-item' to={`?${currentCategory ? `category=${currentCategory}&` : ''}sort_by=title&order=ASC`}>
                        <fa.FaSortAlphaDown/>
                    </Link>
                </li>
                <li>
                    <Link className='sort-item' to={`?${currentCategory ? `category=${currentCategory}&` : ''}sort_by=title&order=DESC`}>
                        <fa.FaSortAlphaDownAlt/>
                    </Link>
                </li>
            </ul>
            <p>{loading && 'Loading...'}</p>
            <ReviewsList>
                {reviewData.reviews.map(review => {
                    return (
                        <li key={review.review_id}>
                            <ListItem>
                                <h3><Link to={`/reviews/${review.review_id}`}>{review.title}</Link></h3>
                                <img src={review.review_img_url} alt={review.title}/>
                                <p>{review.owner} | {DateTime.fromISO(review.created_at).toLocaleString()}</p>
                                <p>{!currentCategory && <Link to={`/reviews?category=${review.category}`}>{review.category}</Link>}</p>
                                <p>{review.votes} Votes | {review.comment_count} comments</p>
                            </ListItem>
                        </li>
                    )
                })}
            </ReviewsList>
            {reviewData.total_count > 10 ? pagination(search, page, reviewData) : null}
        </ReviewsWrapper>
    )
}

export default Reviews;
