const WeatherSubCard = ({weatherData}) => {
    
    return (
        <div className="row">
            <div className="col-6">
                <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                <p><strong>Sunrise:</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')} IST</p>
                <p><strong>Description:</strong> {weatherData.weather[0].description}</p>
                <p><strong>Visibility:</strong> {weatherData.visibility / 1000.0} km</p>
            </div>
            <div className="col-6">
                <p><strong>Feels Like:</strong> {weatherData.main.feels_like}&deg;C</p>
                <p><strong>Sunset:</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')} IST</p>
                <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
                <p><strong>Wind Speed:</strong> {weatherData.wind.speed} ms</p>
            </div>
            
        </div>
    );
};

export default WeatherSubCard;