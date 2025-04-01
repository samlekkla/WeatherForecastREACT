import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchQuery, handleSearchChange, handleSearchSubmit }) => {
    return (
        <div className="search-bar">
            <form onSubmit={handleSearchSubmit}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search city"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button className="search-button" type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
