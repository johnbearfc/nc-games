import axios from "axios";

const reviewsApi = axios.create({
  baseURL: "https://nc-board-quest.herokuapp.com/api",
});

export const getReviews = async (search) => {
  let path = `/reviews`;
  let parsedParams = new URLSearchParams(search);

  const { data } = await reviewsApi.get(path, {
    params: {
      category: parsedParams.get("category"),
      sort_by: parsedParams.get("sort_by") || "created_at",
      order: parsedParams.get("order") || "DESC",
      p: parsedParams.get("p"),
      limit: parsedParams.get("limit"),
    },
  });

  return data;
};

export const getSingleReview = async (review_id) => {
  const { data } = await reviewsApi.get(`/reviews/${review_id}`);

  return data.review;
};

export const getCategories = async () => {
  const { data } = await reviewsApi.get("/categories");
  return data.categories;
};

export const getComments = async (review_id, commentsExtended) => {
  let limit = commentsExtended ? 100 : 10;

  const { data } = await reviewsApi.get(`/reviews/${review_id}/comments`, {
    params: { limit },
  });
  return data.comments;
};

export const getUser = async (username) => {
  const { data } = await reviewsApi.get(`/users/${username}`);
  return data.user;
};

export const patchReviewVotes = async (review_id) => {
  await reviewsApi.patch(`/reviews/${review_id}`, { inc_votes: 1 });
};

export const patchCommentVotes = async (comment_id) => {
  await reviewsApi.patch(`/comments/${comment_id}`, { inc_votes: 1 });
};

export const postComment = async (review_id, username, body) => {
  await reviewsApi.post(`/reviews/${review_id}/comments`, { username, body });
};

export const deleteComment = async (comment_id) => {
  await reviewsApi.delete(`/comments/${comment_id}`);
};

export const postReview = async (reviewInput, username) => {
  const { data } = await reviewsApi.post(`/reviews`, {
    owner: username,
    ...reviewInput,
  });
  return data.review.review_id;
};

export const deleteReview = async (review_id) => {
  await reviewsApi.delete(`/reviews/${review_id}`);
};
