const apiKey = '7f2302001416b3549088c98c1c5e7d9c';

// Fetch current weather
export const fetchWeatherData = async (city) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`
    );
    const data = await response.json();

    if (!data.main) throw new Error("City not found");

    return {
        city: data.name,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        temp: Math.round(data.main.temp),
        minTemp: Math.round(data.main.temp_min),
        maxTemp: Math.round(data.main.temp_max),
        description: capitalize(data.weather[0].description),
        icon: data.weather[0].icon,
    };
};

// Fetch 5-day forecast
export const fetchForecastData = async (city) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=en`
    );
    const data = await response.json();
    return data.list;
};

// Utility: Capitalize first letter
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
