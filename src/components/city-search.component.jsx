import { useContext, useEffect, useRef, useState } from "react";
import { CityContext } from "../contexts/city.context";

const CitySearch = () => {
    const [searchCity, setSearchCity] = useState("");
    const {setCity, cityData, city} = useContext(CityContext);
    const pattern = useRef(cityData.current.join("|"));
    const [cityOptions, setCityOptions] = useState([]);
    const [clicker, setClicker] = useState(0);

    const clickHandler = (event) => {
        document.getElementById('myInput').value = event.target.innerText;
        
        setSearchCity("");
        setCity(event.target.innerText);
        setCityOptions([]);
        setClicker(0);
    }

    const searchHandler = (event) => {
        if (typeof event == 'undefined')
            return;

        setSearchCity(event.target.value);
    }

    useEffect(() => {
        if (searchCity.length < 3 ) return;
        if (clicker.current === 0) return;

        let input, filter;
        input = searchCity;
        filter = input.toUpperCase();
        let cityOptionsVal = [];
        cityData.current.map((curCity, i) => {
            let c = curCity.name;
            c = c.normalize('NFD').replace(/([\u0300-\u036f]|[^a-zA-Z\s])/g, '');
            if (c.toUpperCase().indexOf(filter.toUpperCase()) === 0) {
                if (curCity.state.length > 0)
                    cityOptionsVal.push(<p onClick={clickHandler} key={i}>{curCity.name}, {curCity.state}, {curCity.country} [{curCity.lat}, {curCity.lon}]</p>);
                else
                    cityOptionsVal.push(<p onClick={clickHandler} key={i}>{curCity.name}, {curCity.country} [{curCity.lat}, {curCity.lon}]</p>);
            }
        });
        setCityOptions(cityOptionsVal);
    }, [clicker]);

    return (
        <div className="container">
            <p className="city-name">{city}</p>
            <div className="search-box">
                <div id="myDropdown" className="dropdown-content form-check-inline">
                    <input type="text" placeholder="City name..." id="myInput" onChange={searchHandler} pattern={pattern} value={searchCity} />
                    {!cityOptions.length && <button type="button" className="searchBtn" onClick={() => {
                        setClicker(clicker + 1);
                    }}>Get</button>}
                    <div id="options_box">
                        {cityOptions}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CitySearch;