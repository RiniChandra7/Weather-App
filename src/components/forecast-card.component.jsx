const ForecastCard = ({forecast}) => {
    return (
        <div className="col-2 card-bg city-name-top-clearance">
            <b>{new Date(forecast.dt * 1000).toLocaleDateString('en-IN')}</b>
            <p>{new Date(forecast.dt * 1000).toLocaleTimeString('en-IN')}</p>
        </div>
    );
    
}

export default ForecastCard;