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
            if (cityData.current.length === 0 && cityList.length === 0) {
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
                    cityData.current = jsondata.map((c) => {
                        const cd = {};
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