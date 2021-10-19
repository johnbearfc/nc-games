import axios from "axios";

const reviewsApi = axios.create({
    baseURL: 'https://nc-board-quest.herokuapp.com/api',
});

export const getReviews = async (category_slug) => {
    let path = '/reviews';
    const { data } = await reviewsApi.get(path, {
        params: { category: category_slug }
    });
    return data.reviews;
}

export const getCategories = async () => {
    const { data } = await reviewsApi.get('/categories');
    return data.categories;
}