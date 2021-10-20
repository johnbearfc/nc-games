import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import { getReviews } from '../utils/api';
import { Link } from 'react-router-dom';
import * as fa from 'react-icons/fa';
import { DateTime } from 'luxon';

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

const PagesWrapper = styled.nav`

`

const Reviews = () => {
    const [reviewData, setReviewData] = useState({reviews: [], total_count: null});
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useState('');
    const { category_slug } = useParams();
    const { search } = useLocation();

    console.log(searchParams, 'searchParams');
    console.log(search, 'search');
    console.log(page, 'page');

    useEffect(() => {
        setErr(null);
        const currentPage = new URLSearchParams(search);
        setPage(currentPage.get('p') || 1);
        // setSearchParams(search ? `${search}&p=${page}` : `?p=${page}`);

        getReviews({ category_slug, search }).then((reviewsFromApi) => {
            setReviewData(reviewsFromApi);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            if (err.response.status === 404) setErr('Category not found');
            else setErr('Something went wrong :(');
        });

        window.scrollTo(0, 0);
    }, [search, category_slug, searchParams, page]);

    if (err) {
        return (
            <ReviewsWrapper>
                <p>{err}</p>
            </ReviewsWrapper>
        );
    }

    const pagination = () => {
        const totalPages = Math.ceil(reviewData.total_count / 10);
        const previousPage = new URLSearchParams(search);
        const nextPage = new URLSearchParams(search);

        previousPage.set('p', Number(page) - 1);
        nextPage.set('p', Number(page) + 1);

        // console.log(nextPage.toString(), 'pagination');

        return (
            <PagesWrapper>
                <Link to={'?' + previousPage.toString()}>
                    <button disabled={page <= 1}>previous</button>
                </Link>
                <span>{page}/{totalPages}</span>
                <Link to={'?' + nextPage.toString()}>
                    <button disabled={page === totalPages}>next</button>
                </Link>
            </PagesWrapper>
        )
    }

    return (
        <ReviewsWrapper>
            <Link to={category_slug ? `reviews/${category_slug}` : '/reviews'}>
                <h1>{category_slug || 'All'}</h1>
            </Link>
            <ul className='sort-list'>
                <li>
                    <Link className='sort-item' to='?sort_by=created_at&order=DESC'>
                        <fa.FaRegCalendarAlt/><fa.FaLongArrowAltDown/>
                    </Link>
                </li>
                <li>
                    <Link className='sort-item' to='?sort_by=created_at&order=ASC'>
                        <fa.FaRegCalendarAlt/><fa.FaLongArrowAltUp/>
                    </Link>
                </li>
                <li>
                    <Link className='sort-item' to='?sort_by=title&order=ASC'>
                        <fa.FaSortAlphaDown/>
                    </Link>
                </li>
                <li>
                    <Link className='sort-item' to='?sort_by=title&order=DESC'>
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
                                <h3>{review.title}</h3>
                                <img src={review.review_img_url} alt={review.title}/>
                                <p>{review.owner} | {DateTime.fromISO(review.created_at).toLocaleString()}</p>
                                <p>{!category_slug && <Link to={`/reviews/${review.category}`}>{review.category}</Link>}</p>
                                <p>{review.votes} Votes | {review.comment_count} comments</p>
                            </ListItem>
                        </li>
                    )
                })}
            </ReviewsList>
            {reviewData.total_count > 10 ? pagination() : null}
        </ReviewsWrapper>
    )
}

export default Reviews;
