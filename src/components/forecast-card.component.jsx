const ForecastCard = ({date, temp, cond, count}) => {
    const col = (count === 5) ? 'col-2 forecast-card-clearance' : 'col-3 forecast-card-top-clearance';

    return (
        <div className={`${col} card-bg`}>
            <b>{date}</b>
            <h3>{temp.toFixed(2)}&deg;C</h3>
            <p>{cond}</p>
        </div>
    );
}

export default ForecastCard;