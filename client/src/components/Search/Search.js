import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Search.css";

export const Search = ({ setSearchKeyword }) => {
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    setSearchKeyword(inputVal);
  }, [inputVal]);

  return (
    <div className='search-container'>
      <input
        type='text'
        className='search-field'
        placeholder='Search a property'
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <SearchIcon className='search-icon' />
    </div>
  );
};
