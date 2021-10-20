import axios from "axios";

const reviewsApi = axios.create({
    baseURL: 'https://nc-board-quest.herokuapp.com/api',
});

export const getReviews = async (search) => {
    let path = `/reviews`;
    let parsedParams = new URLSearchParams(search);

    const { data } = await reviewsApi.get(path, {
        params: { 
            category: parsedParams.get('category'),
            sort_by: parsedParams.get('sort_by') || 'created_at',
            order: parsedParams.get('order') || 'DESC',
            p: parsedParams.get('p'),
        }
    });

    return data;
}

export const getSingleReview = async (review_id) => {
    const { data } = await reviewsApi.get(`/reviews/${review_id}`);

    return data.review;
}

export const getCategories = async () => {
    const { data } = await reviewsApi.get('/categories');
    return data.categories;
}