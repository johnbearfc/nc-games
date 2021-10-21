import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as gi from 'react-icons/gi';
import { getReviews } from '../utils/api';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const Wrapper = styled.section`

    header {
        font-size: 2rem;
        line-height: 0;
    
        width: 50%;
        margin: auto;
        padding-top: 96px;
        padding-bottom: 96px;
        text-align: center;
    
        #board {
            padding-right: 30px
        }
        
        #quest {
            padding-left: 30px
        }
    }
    
    .featured-reviews {
        width: 80%;
        margin: auto;
        border: 1px solid;
        padding: 5px;
    }
    
`;

const ReviewsList = styled.ul`
    list-style-type: none;
    padding: 0;
`

const ListItem = styled.div`
    background-color: lightgrey;
    margin-bottom: 20px;
    padding: 10px;

    font-size: 0.8rem;

    img {
        max-width: 100%;
    }

    h3 {
        font-size: 1rem;
    }
`;

const Home = ({ reviewData, setReviewData, loading, setLoading, err, setErr }) => {

    useEffect(() => {
        setErr(null);

        getReviews('?limit=3').then((reviewsFromApi) => {
            setReviewData(reviewsFromApi);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            setErr('Something went wrong :(');
        });
    }, [setReviewData, setErr, setLoading])

    return (
        <Wrapper>
            <header>
                <h1 id='board'>Board</h1>
                <h1 id='quest'>Quest</h1>
                <button><gi.GiPerspectiveDiceSixFacesSix/></button>
            </header>
            <section className='featured-reviews'>
                <h2>Featured Reviews:</h2>
                <p>{loading && 'Loading...'}</p>
                <p>{err && err}</p>
                <ReviewsList>
                    {reviewData.reviews.map(review => {
                        return (
                            <li key={review.review_id}>
                                <ListItem>
                                    <h3><Link to={`/reviews/${review.review_id}`}>{review.title}</Link></h3>
                                    <img src={review.review_img_url} alt={review.title}/>
                                    <p>{review.owner} | {DateTime.fromISO(review.created_at).toLocaleString()}</p>
                                    <p><Link to={`/reviews?category=${review.category}`}>{review.category}</Link></p>
                                    <p>{review.votes} Votes | {review.comment_count} comments</p>
                                </ListItem>
                            </li>
                        )
                    })}
                </ReviewsList>
            </section>
        </Wrapper>
    );
}

export default Home;