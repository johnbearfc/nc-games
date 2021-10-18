import axios from "axios";

const reviewsApi = axios.create({
    baseURL: 'https://nc-board-quest.herokuapp.com/api',
});

export const getReviews = async () => {
    const { data } = await reviewsApi.get('/reviews?limit=24');
    return data.reviews;
}