import ForecastCard from "./forecast-card.component";

const Forecast = ({forecastList}) => {
    console.log(forecastList.list)
    let forecastArray = [...forecastList.list];
    let today = new Date();
    let fcAr = forecastArray.filter((fc) => {
        let fcDate = new Date(fc.dt * 1000);
        return fcDate.getDate() > today.getDate();
    });
    console.log(fcAr);

    let avgFc = [];
    let count = 1;
    let tempSum = fcAr[0].main.temp;
    let prevDate = new Date(fcAr[0].dt * 1000);
    let condMap = new Map();
    condMap.set(fcAr[0].weather[0].main, 1);
    console.log("Init "+prevDate.getDate())

    for (let i = 1; i < fcAr.length; i++) {
        let fcDate = new Date(fcAr[i].dt * 1000);
        if (fcDate.getDate() == prevDate.getDate()) {
            tempSum += fcAr[i].main.temp;
            count++;

            if (condMap.has(fcAr[i].weather[0].main)) {
                condMap.set(fcAr[i].weather[0].main, condMap.get(fcAr[i].weather[0].main) + 1);
            }
            else {
                condMap.set(fcAr[i].weather[0].main, 1);
            }
        }
        else {
            let finTemp = tempSum / count;
            let finCond;
            let max = 0;
            condMap.forEach (function(value, key) {
                if (value > max) {
                    max = value;
                    finCond = key;
                }
            })

            let obj = {
                date: prevDate.toLocaleDateString('en-IN'),
                temp: finTemp,
                cond: finCond
            };

            avgFc.push(obj);

            tempSum = 0;
            count = 0;
            condMap = new Map();
            i = i - 1;
        }
        prevDate = fcDate;
    }

    let finCond;
    let max = 0;
    condMap.forEach (function(value, key) {
        if (value > max) {
            max = value;
            finCond = key;
        }
    })

    let obj = {
        date: prevDate.toLocaleDateString('en-IN'),
        temp: tempSum/count,
        cond: finCond
    };

    avgFc.push(obj);

    console.log(avgFc);

    const forecastItems = avgFc.map((forecast, ind) =>
        <ForecastCard date={forecast.date} temp={forecast.temp} cond={forecast.cond} count={avgFc.length} key={ind} />
    );

    return (
    <div className="row container">
        {forecastItems}
    </div>
    );
}

export default Forecast;