const CurrentWeather = ({ currentWeather }) => {
    if (!currentWeather) return null;
  
    return (
      <div className="current-weather">
        <h2>Vädret i {currentWeather.city}</h2>
        <p><strong>Datum:</strong> {currentWeather.date}</p>
        <p><strong>Tid:</strong> {currentWeather.time}</p>
        <img src={`https://openweathermap.org/img/wn/${currentWeather.icon}.png`} alt={currentWeather.description} />
        <p><strong>Temperatur:</strong> {currentWeather.temp}°C</p>
        <p>{currentWeather.description}</p>
      </div>
    );
  };
  
  export default CurrentWeather;
  