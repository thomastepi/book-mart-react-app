import React from "react";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, resetFilter } from "../features/allbooks/allbooksSlice";

const SearchContainer = () => {
  const { isLoadiing, search, availability, genre, sort, sortOptions, price } =
    useSelector((store) => store.allBooks);
  const { genreOptions, availabilityOptions } = useSelector(
    (store) => store.book
  );
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    if (isLoadiing) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetFilter());
  };
  return (
    <Wrapper>
      <form className="form">
        <h4 className="">Search Form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Search Title"
            name="search"
            value={search}
            onChange={handleSearch}
          />
          <FormRow
            type="text"
            labelText="Max Price"
            name="price"
            value={price}
            onChange={handleSearch}
          />
          <FormRowSelect
            labelText="Genre"
            name="genre"
            value={genre}
            handleChange={handleSearch}
            list={["all", ...genreOptions]}
          />
          <FormRowSelect
            labelText="Availability"
            name="availability"
            value={availability}
            handleChange={handleSearch}
            list={["all", ...availabilityOptions]}
          />
          <FormRowSelect
            labelText="Sort By"
            name="sort"
            value={sort}
            list={sortOptions}
            handleChange={handleSearch}
          />
          <button
            className="btn btn-block btn-danger"
            type="submit"
            disabled={isLoadiing}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
