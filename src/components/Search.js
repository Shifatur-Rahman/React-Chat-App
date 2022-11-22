import React from "react";
import { BsSearch } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Search = () => {
  return (
    <>
      <div className="search">
        <input placeholder="search" />
        <div className="searchIcon">
          <BsSearch />
        </div>
        <div className="searchDotButton">
          <BiDotsVerticalRounded />
        </div>
      </div>
    </>
  );
};

export default Search;
