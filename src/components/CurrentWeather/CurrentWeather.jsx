import React from "react";
import "./CurrentWeather.css";

const CurrentWeather = ({ currentWeather, addToFavorites }) => {
  if (!currentWeather) return <p>Loading...</p>;

  return (
    <div className="current-weather">
      <h2>{currentWeather.city}</h2>
      <p className="date-time">{currentWeather.date} - {currentWeather.time}</p>
      <img
        className="weather-icon"
        src={`https://openweathermap.org/img/wn/${currentWeather.icon}.png`}
        alt="Weather icon"
      />
      <p className="temperature">🌡️ {currentWeather.temp}°C</p>
      <p className="min-max-temp">⬇️ Min: {currentWeather.minTemp}°C | ⬆️ Max: {currentWeather.maxTemp}°C</p>
      <p className="description">{currentWeather.description}</p>
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default CurrentWeather;
