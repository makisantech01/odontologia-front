import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faMagnifyingGlass);

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400" />
      </span>
      <input
        type="text"
        value={searchTerm}
        onChange={onSearch}
        className="pl-8 pr-2 py-2 w-full rounded-full"
      />
    </div>
  );
};

export default SearchBar;
