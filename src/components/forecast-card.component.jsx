const ForecastCard = ({date, temp, cond, count, src}) => {
    const cls = (count === 5) ? 'forecast-card-clearance' : 'forecast-card-top-clearance';

    return (
        <div className={`${cls} card-bg col-lg-2 col-md-4 col-sm-11`}>
            <b>{date}</b>
            <h3>{temp.toFixed(2)}&deg;C</h3>
            <p>Avg. Temp.</p>
            <img src={`http://openweathermap.org/img/wn/${src}.png`} alt={cond} />
            <p>{cond}</p>
        </div>
    );
}

export default ForecastCard;