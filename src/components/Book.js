import React from "react";
import { FaBriefcase, FaDollarSign } from "react-icons/fa";
import BookInfo from "./BookInfo";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Book";
import { useDispatch } from "react-redux";
import { deleteBook, setEditBook } from "../features/book/bookSlice";

const Book = ({
  _id,
  title,
  price,
  author,
  genre,
  createdAt,
  availability,
}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{author.charAt(0)}</div>
        <div className="info">
          <h5 className="">{title}</h5>
          <p className="">{author}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <BookInfo icon={<FaDollarSign />} text={price} />
          <div className={`status ${availability.toLowerCase()}`}>
            {availability}
          </div>
          <BookInfo icon={<FaBriefcase />} text={genre} />
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-book"
              className="btn edit-btn"
              onClick={() => {
                const editBookId = _id;
                dispatch(
                  setEditBook({
                    editBookId,
                    title,
                    author,
                    genre,
                    createdAt,
                    price,
                    availability,
                  })
                );
              }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteBook(_id))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Book;
