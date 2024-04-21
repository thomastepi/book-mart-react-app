import React, { useEffect } from "react";
import { SearchContainer, BooksContainer } from "../../components";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setGuestMessage } from "../../features/user/userSlice";

const AllBooks = () => {
  const { guestMessage } = useSelector((state) => state.user);
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
  return (
    <>
      <SearchContainer />
      <BooksContainer />
    </>
  );
};

export default AllBooks;
