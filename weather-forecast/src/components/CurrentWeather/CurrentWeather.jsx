import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = ({ currentWeather, addToFavorites }) => {
  return (
    <div className="current-weather">
      {currentWeather ? (
        <>
          <h2>{currentWeather.city}</h2>
          <p>{currentWeather.date} {currentWeather.time}</p>
          <p>{currentWeather.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}.png`}
            alt={currentWeather.description}
          />
          <p>{currentWeather.description}</p>
          <button onClick={addToFavorites}>Add to Favorites</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CurrentWeather;
