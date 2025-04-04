import React from "react";
import "./Favorites.css";

const Favorites = ({ favorites, removeFavorite, handleFavoriteClick }) => {
  return (
    <div className="favorites">
      <h3>Favorites</h3>
      <ul>
        {favorites.map((city, index) => (
          <li key={index}>
            <a href="#" onClick={() => handleFavoriteClick(city)}>{city}</a>
            <span className="remove-text" onClick={() => removeFavorite(city)}>Remove</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
