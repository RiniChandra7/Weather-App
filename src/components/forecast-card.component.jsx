const ForecastCard = ({date, temp, cond, count, src}) => {
    const col = (count === 5) ? 'forecast-card-clearance' : 'forecast-card-top-clearance';

    return (
        <div className={`${col} card-bg col-2`}>
            <b>{date}</b>
            <h3>{temp.toFixed(2)}&deg;C</h3>
            <img src={`http://openweathermap.org/img/wn/${src}.png`} alt={cond} />
            <p>{cond}</p>
        </div>
    );
}

export default ForecastCard;