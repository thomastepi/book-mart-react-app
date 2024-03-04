import React from "react";
import { useEffect } from "react";
import Book from "./Book";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/BooksContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../features/allbooks/allbooksSlice";
import PageBtnContainer from "./PageBtnContainer";

const BooksContainer = () => {
  const {
    books,
    isLoading,
    totalBooks,
    numOfPages,
    page,
    search,
    availability,
    genre,
    sort,
    price,
  } = useSelector((state) => state.allBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch, search, availability, genre, sort, price, page]);

  if (isLoading) {
    return <Loading />;
  }

  if (books.length === 0) {
    return (
      <Wrapper>
        <h2>No books available</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5 className="">Number of Books: {totalBooks}</h5>
      <div className="books">
        {books.map((book) => {
          return <Book key={book._id} {...book} />;
        })}
      </div>
      {numOfPages > 1 && (
        <PageBtnContainer page={page} numOfPages={numOfPages} />
      )}
    </Wrapper>
  );
};

export default BooksContainer;
