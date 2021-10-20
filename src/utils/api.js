import axios from "axios";

const reviewsApi = axios.create({
    baseURL: 'https://nc-board-quest.herokuapp.com/api',
});

export const getReviews = async ({ category_slug, search }) => {
    let path = `/reviews`;
    let category = category_slug;
    // let sort_by = 'created_at';
    // let order = 'DESC';
    // let p = '1';

    // if (searchParams) {
    let parsedParams = new URLSearchParams(search);
        // let sort_by = parsedParams.get('sort_by');
        // let order = parsedParams.get('order');
        // let p = parsedParams.get('p');
    // }
    console.log(parsedParams.toString(), 'APIparams <<<<<<');

    const { data } = await reviewsApi.get(path, {
        params: { 
            category,
            sort_by: parsedParams.get('sort_by') || 'created_at',
            order: parsedParams.get('order') || 'DESC',
            p: parsedParams.get('p'),
        }
    });

    // console.log(sort_by, 'sort_by');
    // console.log(order, 'order');

    return data;
}

export const getCategories = async () => {
    const { data } = await reviewsApi.get('/categories');
    return data.categories;
}