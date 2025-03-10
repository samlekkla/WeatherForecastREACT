import React, { useState, useEffect } from "react";
import Favorites from './Favorites';
import Forecast from './Forecast';
import CurrentWeather from './CurrentWeather';
import SearchBar from './SearchBar';

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Stockholm");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchWeatherData();
    loadFavorites();
  }, [city]);

  const fetchWeatherData = () => {
    const apiKey = '7f2302001416b3549088c98c1c5e7d9c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=sv`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCurrentWeather({
          city: data.name,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        });
      });

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=sv`;
    fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => {
        const dailyForecast = data.list.filter((item, index) => index % 8 === 0); // Filtrera till en väderprognos per dag
        setForecast(dailyForecast.map((item) => ({
          date: new Date(item.dt * 1000).toLocaleDateString(),
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max,
        })));
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCity(searchQuery);
  };

  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  };

  const addToFavorites = () => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (cityToRemove) => {
    const updatedFavorites = favorites.filter((fav) => fav !== cityToRemove);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleFavoriteClick = (favorite) => {
    setCity(favorite);
  };

  return (
    <div className="weather-container">
      <h1>Väderprognos</h1>
      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />

      <Favorites
        favorites={favorites}
        addToFavorites={addToFavorites}
        removeFavorite={removeFavorite}
        handleFavoriteClick={handleFavoriteClick}
      />

      <CurrentWeather currentWeather={currentWeather} />
      <Forecast forecast={forecast} />
    </div>
  );
};

export default Weather;
