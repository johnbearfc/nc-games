import axios from "axios";

const reviewsApi = axios.create({
    baseURL: 'https://nc-board-quest.herokuapp.com/api',
});

export const getReviews = async ({ category_slug, search }) => {
    let path = `/reviews`;

    if (search) {
        let searchParams = new URLSearchParams(search);
        let sort_by = searchParams.get('sort_by');
        let order = searchParams.get('order');

        const { data } = await reviewsApi.get(path, {
            params: { 
                category: category_slug,
                sort_by: sort_by,
                order: order,
            }
        });
        return data.reviews;
    } else {
        const { data } = await reviewsApi.get(path, {
            params: { 
                category: category_slug,
                //sort by date desc
            }
        });
        return data.reviews;
    }
}

export const getCategories = async () => {
    const { data } = await reviewsApi.get('/categories');
    return data.categories;
}