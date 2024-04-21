import React, { useEffect } from "react";
import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  updateBook,
  handleChange,
  clearValues,
} from "../../features/book/bookSlice";
import { setGuestMessage } from "../../features/user/userSlice";
import { toast } from "react-toastify";
//import { handleChange, clearValues } from "../../features/book/bookSlice";
import { Modal } from "antd";

const AddBook = () => {
  const {
    isLoading,
    title,
    author,
    price,
    genreOptions,
    genre,
    availabilityOptions,
    availability,
    isEditing,
    editBookId,
  } = useSelector((state) => state.book);
  const { user, guestMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (guestMessage) {
      const modal = Modal.info();
      modal.update({
        title: "Limited Access!",
        content: guestMessage,
        okText: "Close",
        onOk: () => {
          dispatch(setGuestMessage(""));
          modal.destroy();
        },
      });
    }
  }, [guestMessage, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !price) {
      toast.error("Please fill all fields");
      return;
    }
    if (isEditing) {
      const book = {
        title,
        author,
        price,
        genre,
        availability,
        id: editBookId,
      };
      dispatch(updateBook(book));
      return;
    }

    const book = { title, author, price, genre, availability };
    dispatch(addBook(book));
  };

  const handleBookInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "location", value: user.location }));
    }
  }, [dispatch, isEditing, user.location]);

  return (
    <Wrapper>
      <form className="form">
        <h3 className="">{isEditing ? "edit book" : "add book"}</h3>

        <div className="form-center">
          <FormRow
            label="Title"
            name="title"
            value={title}
            onChange={handleBookInput}
          />
          <FormRow
            label="Author"
            name="author"
            value={author}
            onChange={handleBookInput}
          />
          <FormRow
            label="Price"
            name="price"
            labelText="price"
            value={price}
            onChange={handleBookInput}
          />
          <FormRowSelect
            labelText="Genre"
            name="genre"
            value={genre}
            handleChange={handleBookInput}
            list={genreOptions}
          />
          <FormRowSelect
            labelText="Avalability"
            name="availability"
            value={availability}
            handleChange={handleBookInput}
            list={availabilityOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => {
                dispatch(clearValues());
              }}
            >
              clear
            </button>
            <button
              type="button"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddBook;
