const SearchBar = ({ searchQuery, handleSearchChange, handleSearchSubmit }) => {
    return (
        <div className="search">
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Sök stad"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button type="submit">Sök</button>
            </form>
        </div>
    );
};

export default SearchBar;
