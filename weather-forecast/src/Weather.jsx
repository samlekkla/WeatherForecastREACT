import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = '7f2302001416b3549088c98c1c5e7d9c'; // Ersätt med din API-nyckel från OpenWeatherMap
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=${apiKey}&units=metric&lang=se`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Kunde inte hämta väderdata');
        }

        const data = await response.json();
        setWeather(data);
        setError(null);
      } catch (error) {
        setError(error.message);
        setWeather(null);
      }
    };

    fetchWeather();
  }, []); // Hämtar väderdata när komponenten laddas

  const getFormattedDate = () => {
    const now = new Date();
    return now.toLocaleString(); // Hämtar datum och tid
  };

  return (
    <div className="weather-container">
      <h1>Väder i Stockholm</h1>
      {error && <p className="error">{error}</p>}
      {weather ? (
        <div className="weather-details">
          <div className="current-weather">
            <p><strong>Plats:</strong> {weather.name}, {weather.sys.country}</p>
            <p><strong>Temperatur:</strong> {weather.main.temp}°C</p>
            <p><strong>Datum och tid:</strong> {getFormattedDate()}</p>
            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
            </div>
          </div>

          <div className="detailed-weather">
            <h2>Väderdetaljer</h2>
            <ul>
              <li><strong>Luftfuktighet:</strong> {weather.main.humidity}%</li>
              <li><strong>Vindhastighet:</strong> {weather.wind.speed} m/s</li>
              <li><strong>Väderbeskrivning:</strong> {weather.weather[0].description}</li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Laddar väderdata...</p>
      )}
    </div>
  );
};

export default Weather;
