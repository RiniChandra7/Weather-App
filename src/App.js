import logo from './logo.svg';
import {REACT_APP_API_URL, REACT_APP_API_KEY} from './env'
import './App.css';

import React, { useEffect, useRef, useState } from "react";
import WeatherCard from './components/weather-card.component';
import Forecast from './components/forecast.component';

function App() {
  const lat = useRef(-1);
  const lon = useRef(-1);
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [weatherBg, setWeatherBg] = useState('clear-sky');
  
  useEffect(() => {
    const fetchApiResponse = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat.current = position.coords.latitude;
        lon.current = position.coords.longitude;
      });

      console.log(lat.current + " " + lon.current);

      await fetch(`${REACT_APP_API_URL}/weather/?lat=${lat.current}&lon=${lon.current}&units=metric&APPID=${REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
          setWeatherData(result);
          console.log(result);
      });

      await fetch(`${REACT_APP_API_URL}/forecast/?lat=${lat.current}&lon=${lon.current}&units=metric&APPID=${REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
          setForecastData(result)
          console.log(result)
      });
    }
    fetchApiResponse();
  }, [lat.current, lon.current]);

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

        default:
          setWeatherBg('clear-sky');
          break;
      }
    }
  }, [weatherData]);

  let date = new Date();

  return (
    <div className={`App container-flow ${weatherBg} cover-bg`}>
      <div className='title'>
        <h1>Weather Now</h1>
        <p>{date.toDateString()}</p>
      </div>
      <div className='main-weather-box card-bg container'>
          {(typeof weatherData.main != 'undefined') ? (
            <WeatherCard weatherData={weatherData} />
          ): (
            <div></div>
          )}
        </div>
        <div className='forecast-box'>
          {(typeof forecastData.city != 'undefined') ? (
            <Forecast forecastList={forecastData} />
          ): (
            <div></div>
          )}
        </div>
    </div>
  );
}

export default App;
