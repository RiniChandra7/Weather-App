import logo from './logo.svg';
import {REACT_APP_API_URL, REACT_APP_API_KEY} from './env'
import './App.css';

import React, { useContext, useEffect, useRef, useState } from "react";
import WeatherCard from './components/weather-card.component';
import Forecast from './components/forecast.component';
import { CityContext } from './contexts/city.context';
import CitySearch from './components/city-search.component';

function App() {
  //Initializing defaults with the coordinates of New Delhi, India
  const lat = useRef(28.6139);
  const lon = useRef(77.2090);
  
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [weatherBg, setWeatherBg] = useState('weather-backdrop');
  const {city, setCity} = useContext(CityContext);

  const getWeatherData = async () => {
    console.log(lat.current + " " + lon.current + " in getting weather data");
    await fetch(`${REACT_APP_API_URL}/weather/?lat=${lat.current}&lon=${lon.current}&units=metric&APPID=${REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
          if (result.name.length > 0) {
            setWeatherData(result);
          }
      });
  }
  
  useEffect(() => {
    const fetchApiResponse = async () => {
      if (city.length > 0 && city !== "Current Location") {
        let latBeg = city.indexOf('[') + 1;
        let latEnd = city.lastIndexOf(',');
        let latitude = city.substring(latBeg, latEnd);
        let longitude = city.substring(latEnd + 2, city.length - 1);
        lat.current = latitude;
        lon.current = longitude;
      }
      else {
        navigator.geolocation.getCurrentPosition(function(position) {
          lat.current = position.coords.latitude;
          lon.current = position.coords.longitude;
          setCity("Current Location");
        },
        function(error) {
          alert("To use this app with current location weather detection capabilities, kindly allow location access.");
        });
      }

      await fetch(`${REACT_APP_API_URL}/weather/?lat=${lat.current}&lon=${lon.current}&units=metric&APPID=${REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
          if (result.name.length > 0) {
            setWeatherData(result);
          }
      });

      await fetch(`${REACT_APP_API_URL}/forecast/?lat=${lat.current}&lon=${lon.current}&units=metric&APPID=${REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
          setForecastData(result)
      });
    }
    fetchApiResponse();
  }, [lat, lon, city]);

  useEffect(() => {
    if (typeof weatherData.weather != 'undefined' && window.innerWidth > 599) {
      switch (weatherData.weather[0].main) {
        case 'Thunderstorm':
          setWeatherBg('thunderstorm');
          break;

        case 'Drizzle':
          setWeatherBg('drizzle');
          break;

        case 'Rain':
          setWeatherBg('rain');
          break;

        case 'Snow':
          setWeatherBg('snow');
          break;

        case 'Mist':
        case 'Smoke':
        case 'Haze':
        case 'Fog':
        case 'Dust':
        case 'Ash':
          setWeatherBg('mist');
          break;

        case 'Sand':
          setWeatherBg('sand');
          break;

        case 'Squall':  
          setWeatherBg('squall');
          break;

        case 'Tornado':
          setWeatherBg('tornado');
          break;

        case 'Clouds':
          setWeatherBg('clouds');
          break;

        case 'Clear':
          setWeatherBg('clear-sky');
          break;

        default:
          setWeatherBg('weather-backdrop');
      }
    }
  }, [weatherData]);

  let date = new Date();

  return (
    <div className={`App container-flow`}>
      <div className='title'>
        <h1>Weather Now</h1>
        <p>{date.toDateString()}</p>
        <div>
          <CitySearch />
        </div>
      </div>
      <div className='row container weather-box'>
        <div className='col-lg-6 col-sm-12 card-bg container'>
          {(typeof weatherData.main != 'undefined') ? (
            <WeatherCard weatherData={weatherData} lat={lat} lon={lon} />
          ): (
            <div></div>
          )}
        </div>
        {window.innerWidth > 600 && <div className={`col-lg-6 col-sm-12 card-bg ${weatherBg} cover-bg`} lat={lat} lon={lon}></div>}
      </div>
      
        <div className='forecast-box col-lg-11 col-md-10 col-sm-9'>
          {(typeof forecastData.city != 'undefined') ? (
            <Forecast forecastList={forecastData}  lat={lat} lon={lon} />
          ): (
            <div></div>
          )}
        </div>
    </div>
  );
}

export default App;
