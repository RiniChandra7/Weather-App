import { createContext, useEffect, useState } from "react";
import getCityData from './getCitiesHelper';

export const CityContext = createContext({
    city: "",
    cityList: [],
    setCity: () => {},
});

export const CityProvider = ({children}) => {
    const [city, setCity] = useState("");
    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        getCityData().then((cities) => {
            setCityList(cities);
        });
    }, []);

    const value = {
        city,
        cityList,
        setCity,
    };

    return <CityContext.Provider value={value}>{children}</CityContext.Provider>
}