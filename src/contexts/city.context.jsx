import { createContext, useEffect, useRef, useState } from "react";

export const CityContext = createContext({
    city: "",
    cityList: [],
    setCity: () => {},
    cityData: []
});

export const CityProvider = ({children}) => {
    const [city, setCity] = useState("");
    const [cityList, setCityList] = useState([]);
    const cityData = useRef([]);

    useEffect(() => {
        const getCitiesHelper = async () => {
            if (cityData.current.length == 0 && cityList.length == 0) {
                console.log("Cities fetched");
                await fetch(`./city.json`, {
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                        }
                })
                .then(response => {
                    return response.json();
                })
                .then(jsondata => {
                    console.log("Cities fetched 1");
                    /*const ids = jsondata.map(o => o.id);
                    const filtered = jsondata.filter(({id}, index) => !ids.includes(id, index + 1));*/

                    cityData.current = jsondata.map((c) => {
                        const cd = {};
                        /*let cityFullName;
                        if (c.country == "US") {
                            cityFullName = c.name+","+c.state+", "+c.country;
                        }
                        else {
                            cityFullName = c.name+", "+c.country;
                        }*/
                        if (typeof c.coord !== 'undefined') {
                            cd.name = c.name;
                            cd.state = c.state;
                            cd.country = c.country;
                            cd.lat = c.coord.lat;
                            cd.lon = c.coord.lon;
                        }
                        
                        return cd;
                    });
                });
            }
        }
        getCitiesHelper();
    }, []);

    const value = {
        city,
        cityList,
        setCity,
        cityData
    };

    return <CityContext.Provider value={value}>{children}</CityContext.Provider>
}