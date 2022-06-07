import WeatherSubCard from "./weather-sub-card.component";

const WeatherCard = ({weatherData}) => {
    const src = weatherData.weather[0].icon;
    return (
        <div>
            <div className="row">
                <div className="col-6 city-name-top-clearance">
                    <h2>{weatherData.name}</h2>
                    <p><em>{weatherData.main.sea_level} m above sea level </em></p>
                </div>
                <div className="col-6">
                    <img src={`http://openweathermap.org/img/wn/${src}@2x.png`} />
                </div>
            </div>
            <div className="row">
                <WeatherSubCard weatherData={weatherData} />
            </div>
        </div>
    );
};

export default WeatherCard;