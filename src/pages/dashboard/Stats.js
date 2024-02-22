import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showStats } from "../../features/allbooks/allbooksSlice";
import { StatsContainer, Loading } from "../../components";

const Stats = () => {
  const { isLoading } = useSelector(
    (state) => state.allBooks
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
    </>
  );
};

export default Stats;
