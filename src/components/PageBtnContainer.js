import React from "react";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { changePage } from "../features/allbooks/allbooksSlice";

const PageBtnContainer = () => {
  const { page, numOfPages } = useSelector((state) => state.allBooks);
  const dispatch = useDispatch();
  const pages = [];
  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  }
  const nextPage = () => {
    let nextPage = page + 1;
    if (nextPage > numOfPages) {
      nextPage = 1;
    }
    dispatch(changePage(nextPage));
  };
  const prevPage = () => {
    let prevPage = page - 1;
    if (prevPage < 1) {
      prevPage = numOfPages;
    }
    dispatch(changePage(prevPage));
  };
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              key={pageNumber}
              onClick={() => dispatch(changePage(pageNumber))}
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
