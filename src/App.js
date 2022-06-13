import logo from './logo.svg';
import {REACT_APP_API_URL, REACT_APP_API_KEY} from './env'
import './App.css';

import React, { useContext, useEffect, useRef, useState } from "react";
import WeatherCard from './components/weather-card.component';
import Forecast from './components/forecast.component';
import { CityContext } from './contexts/city.context';
import CitySearch from './components/city-search.component';

function App() {
  const lat = useRef(-1);
  const lon = useRef(-1);

  //const [lat, setLat] = useState(-1);
  //const [lon, setLon] = useState(-1);
  
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
  
  console.log(city);

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
        });
      }

      console.log(lat.current + " " + lon.current);

      console.log(lat.current + " " + lon.current + " in getting weather data");
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
          //console.log(result)
      });
    }
    fetchApiResponse();
  }, [lat, lon, city]);

  useEffect(() => {
    if (typeof weatherData.weather != 'undefined') {
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
        <div className={`col-lg-6 col-sm-12 card-bg ${weatherBg} cover-bg`} lat={lat} lon={lon}></div>
      </div>
      
        <div className='forecast-box'>
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
