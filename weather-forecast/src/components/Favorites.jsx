const Favorites = ({ favorites, addToFavorites, removeFavorite, handleFavoriteClick }) => {
    return (
      <div className="favorites">
        <h3>Favoritplatser</h3>
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index}>
              <a href="#" onClick={() => handleFavoriteClick(favorite)}>{favorite}</a>
              <button onClick={() => removeFavorite(favorite)}>Ta bort</button>
            </li>
          ))}
        </ul>
        <button onClick={addToFavorites}>Lägg till favorit</button>
      </div>
    );
  };
  
  export default Favorites;
  