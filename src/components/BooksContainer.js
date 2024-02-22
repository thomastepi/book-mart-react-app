import React from "react";
import { useEffect } from "react";
import Book from "./Book";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/BooksContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../features/allbooks/allbooksSlice";

const BooksContainer = () => {
  const { books, isLoading } = useSelector((state) => state.allBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

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
      <h5 className="">books info</h5>
      <div className="jobs">
        {books.map((book) => {
          return <Book key={book._id} {...book} />;
        })}
      </div>
    </Wrapper>
  );
};

export default BooksContainer;
