const WeatherCard = ({weatherData, lat, lon}) => {
    const src = weatherData.weather[0].icon;
    return (
        <div>
            <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-12 city-name-top-clearance">
                    <h2>{weatherData.name}</h2>
                    <p><em>{weatherData.main.sea_level} m above sea level </em></p>
                    <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                    <p><strong>Sunrise:</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')} IST</p>
                    <p><strong>Description:</strong> {weatherData.weather[0].description}</p>
                    <p><strong>Visibility:</strong> {weatherData.visibility / 1000.0} km</p>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12">
                        <img src={`http://openweathermap.org/img/wn/${src}@2x.png`} alt="Weather Icon" />
                    </div>
                <div className="col-lg-5 col-md-5 col-sm-12">
                    <h2 className="temp-top-clearance">{weatherData.main.temp}&deg;C</h2>
                    <p><em>Current Temperature</em></p>
                    <p><strong>Feels Like:</strong> {weatherData.main.feels_like}&deg;C</p>
                    <p><strong>Sunset:</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')} IST</p>
                    <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
                    <p><strong>Wind Speed:</strong> {weatherData.wind.speed} ms</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;