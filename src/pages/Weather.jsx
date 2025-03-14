import React, { useState, useEffect } from "react";
import Favorites from "../components/Favorites/Favorites";
import Forecast from "../components/Forecast/Forecast";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import SearchBar from "../components/SearchBar/SearchBar";
import Footer from "../components/Footer/Footer";

import "./Weather.css";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Stockholm");
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const apiKey = '7f2302001416b3549088c98c1c5e7d9c';

  // Fetch weather and forecast data on city change
  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
      fetchForecastData(city);
    }
  }, [city]);

  // Fetch current weather data
  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      if (data.main) {
        setCurrentWeather({
          city: data.name,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        });
      } else {
        alert("City not found, please try again.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Fetch forecast data
  const fetchForecastData = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      const groupedData = groupForecastByDay(data.list);
      setForecast(groupedData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  // Group forecast data by day
  const groupForecastByDay = (forecastData) => {
    const forecastByDay = [];

    forecastData.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      let day = forecastByDay.find((day) => day.date === date);

      if (!day) {
        day = {
          date,
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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      setCity(searchQuery);
      setSearchQuery(""); // Clear the search input after submitting
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>

      {/* SearchBar for city input */}
      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />

      {/* Favorites Section */}
      <Favorites
        favorites={favorites}
        removeFavorite={(cityToRemove) => setFavorites(favorites.filter((fav) => fav !== cityToRemove))}
        handleFavoriteClick={setCity}
      />

      {/* Current Weather Section */}
      <CurrentWeather
        currentWeather={currentWeather}
        addToFavorites={() => setFavorites((prevFavorites) => [...prevFavorites, city])}
      />

      {/* Forecast Section */}
      <Forecast forecast={forecast} />

      {/* Footer Section */}
      <Footer />

    </div>


  );
};

export default Weather;
