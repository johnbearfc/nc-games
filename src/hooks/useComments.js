import { useEffect, useState } from "react";
import { getComments } from "../utils/api";

const useComments = (review_id) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(review_id, commentsExtended).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [review_id, commentsExtended]);

  return { comments, setComments };
};

export default useComments;
