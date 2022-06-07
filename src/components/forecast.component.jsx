import ForecastCard from "./forecast-card.component";

const Forecast = ({forecastList}) => {
    console.log(forecastList.list)
    const forecastArray = [...forecastList.list];
    const forecastItems = forecastArray.map((forecast, ind) =>
        <ForecastCard forecast={forecast} key={ind} />
    );

    return (
    <div className="row container">
        {forecastItems}
    </div>
    );
}

export default Forecast;