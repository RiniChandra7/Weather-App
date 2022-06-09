import ForecastCard from "./forecast-card.component";
import TemperatureChart from "./line-chart.component";

const findIcon = (cond) => {
    switch (cond) {
        case 'Thunderstorm':
            return '11d';

        case 'Drizzle':
            return '09d';
            
        case 'Rain':
            return '10d';

        case 'Snow':
            return '13d';

        case 'Mist':
        case 'Smoke':
        case 'Haze':
        case 'Fog':
        case 'Dust':
        case 'Ash':
        case 'Sand':
        case 'Squall':  
        case 'Tornado':
            return '50d';

        case 'Clear':
            return '01d';

        case 'Clouds':
            return '02d';
    
        default:
            break;
    }
}

const Forecast = ({forecastList}) => {
    let forecastArray = [...forecastList.list];
    let today = new Date();
    let fcAr = forecastArray.filter((fc) => {
        let fcDate = new Date(fc.dt * 1000);
        return fcDate.getDate() > today.getDate();
    });

    let avgFc = [];
    let count = 1;
    let tempSum = fcAr[0].main.temp;
    let prevDate = new Date(fcAr[0].dt * 1000);
    let condMap = new Map();
    condMap.set(fcAr[0].weather[0].main, 1);

    let labels = [];
    let temp = [];
    let feel = [];
    let c = 0;
    let start = 0;

    for (let i = 0; i < fcAr.length; i++) {
        let thisTime = new Date(fcAr[i].dt * 1000);
        if (thisTime.getHours() > today.getHours()) {
            start = i;
            break;
        }
    }

    for (let i = start; i < start + 8; i++) {
        let thisTime = new Date(fcAr[i].dt * 1000);
        labels.push(thisTime.toLocaleTimeString('en-IN'));
        temp.push(fcAr[i].main.temp);
        feel.push(fcAr[i].main.feels_like);
    }

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
            let icon;
            condMap.forEach (function(value, key) {
                if (value > max) {
                    max = value;
                    finCond = key;
                    icon = findIcon(finCond);
                }
            })

            let obj = {
                date: prevDate.toLocaleDateString('en-IN'),
                temp: finTemp,
                cond: finCond,
                icon: icon
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
    let icon;
    condMap.forEach (function(value, key) {
        if (value > max) {
            max = value;
            finCond = key;
        }
    })

    let obj = {
        date: prevDate.toLocaleDateString('en-IN'),
        temp: tempSum/count,
        cond: finCond,
        icon: findIcon(finCond)
    };

    avgFc.push(obj);

    const forecastItems = avgFc.map((forecast, ind) =>
        <ForecastCard date={forecast.date} temp={forecast.temp} cond={forecast.cond} count={avgFc.length} src={forecast.icon} key={ind} />
    );

    let chartData = {
        labels: labels,
        datasets: [
          {
            label: "Temperature",
            data: temp,
            fill: false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: "Real Feel",
            data: feel,
            fill: false,
            borderColor: "#742774"
          }
        ]
    };

    return (
    <div className="container">
        <div className="row card-bg temp-top-clearance chart-box">
            <TemperatureChart className="card-bg" chartData={chartData} />
        </div>
        <div className="row forecast-cards-box">{forecastItems}</div>
    </div>
    );
}

export default Forecast;