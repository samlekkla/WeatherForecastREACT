import React, { useState, useEffect } from "react";
import Favorites from "../components/Favorites/Favorites";
import Forecast from "../components/Forecast/Forecast";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import SearchBar from "../components/SearchBar/SearchBar";
import Footer from "../components/Footer/Footer";
import { fetchWeatherData, fetchForecastData } from "../services/weatherService";
import "./Weather.css";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Stockholm");
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // När staden ändras, hämta väderdata
  useEffect(() => {
    if (city) {
      getCurrentWeather(city);
      getForecast(city);
    }
  }, [city]);

  const getCurrentWeather = async (city) => {
    try {
      const data = await fetchWeatherData(city);
      setCurrentWeather(data);
    } catch (error) {
      alert("City not found, please try again.");
      console.error("Error fetching current weather:", error);
    }
  };

  const getForecast = async (city) => {
    try {
      const forecastData = await fetchForecastData(city);
      const grouped = groupForecastByDay(forecastData);
      setForecast(grouped);
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  const groupForecastByDay = (forecastData) => {
    const forecastByDay = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    forecastData.forEach((item) => {
      const date = new Date(item.dt * 1000);
      date.setHours(0, 0, 0, 0);

      if (date <= today) return;
      if (forecastByDay.length >= 5) return;

      const dateStr = date.toLocaleDateString();
      let day = forecastByDay.find((d) => d.date === dateStr);

      if (!day) {
        day = {
          date: dateStr,
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        };
        forecastByDay.push(day);
      } else {
        day.minTemp = Math.min(day.minTemp, item.main.temp_min);
        day.maxTemp = Math.max(day.maxTemp, item.main.temp_max);
      }
    });

    return forecastByDay;
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      setCity(searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>

      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />

      <Favorites
        favorites={favorites}
        removeFavorite={(cityToRemove) =>
          setFavorites(favorites.filter((fav) => fav !== cityToRemove))
        }
        handleFavoriteClick={setCity}
      />

      <CurrentWeather
        currentWeather={currentWeather}
        addToFavorites={() =>
          setFavorites((prevFavorites) =>
            prevFavorites.includes(city) ? prevFavorites : [...prevFavorites, city]
          )
        }
      />

      <Forecast forecast={forecast} />

      <Footer />
    </div>
  );
};

export default Weather;
