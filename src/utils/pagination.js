import { Link } from "react-router-dom";
import styled from "styled-components";

const PagesWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;

export const pagination = (search, page, reviewData) => {
  const totalPages = Math.ceil(reviewData.total_count / 10);
  const previousPage = new URLSearchParams(search);
  const nextPage = new URLSearchParams(search);

  previousPage.set("p", Number(page) - 1);
  nextPage.set("p", Number(page) + 1);

  return (
    <PagesWrapper>
      <Link to={"?" + previousPage.toString()}>
        <button disabled={page <= 1}>previous</button>
      </Link>
      <span>
        {page}/{totalPages}
      </span>
      <Link to={"?" + nextPage.toString()}>
        <button disabled={page >= totalPages}>next</button>
      </Link>
    </PagesWrapper>
  );
};
