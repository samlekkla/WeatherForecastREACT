const Forecast = ({ forecast }) => {
    return (
      <div className="forecast">
        <h2>5-dagarsprognos</h2>
        <div className="forecast-cards">
          {forecast.map((item, index) => (
            <div key={index} className="forecast-card">
              <p><strong>{item.date}</strong></p>
              <img src={`https://openweathermap.org/img/wn/${item.icon}.png`} alt={item.description} />
              <p>{item.description}</p>
              <p><strong>Min:</strong> {item.minTemp}°C</p>
              <p><strong>Max:</strong> {item.maxTemp}°C</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Forecast;
  