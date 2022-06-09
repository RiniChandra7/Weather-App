import { memoize } from "lodash";

const getCityData = () =>
  new Promise((resolve) => {
    fetch(`./city.json`, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
    })
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        return jsondata.map((c) => {
            const cd = {};
            let cityFullName;
            if (c.country == "US") {
                cityFullName = c.name+","+c.state+", "+c.country;
            }
            else {
                cityFullName = c.name+", "+c.country;
            }
            cd[cityFullName] = [c.coord.lat, c.coord.lon];

            return cd;
        })
    });
});

export default memoize(getCityData);