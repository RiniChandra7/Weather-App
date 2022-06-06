import logo from './logo.svg';
import {REACT_APP_API_URL, REACT_APP_API_KEY} from './env'
import './App.css';

import React, { useEffect, useState } from "react";
import WeatherCard from './components/weather-card.component';

function App() {
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  
  useEffect(() => {
    const fetchApiResponse = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });

      await fetch(`${REACT_APP_API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setWeatherData(result)
        console.log(result);
      });

      await fetch(`${REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${lon}&units=metric&APPID=${REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setForecastData(result)
        console.log(result);
      });
    }
    fetchApiResponse();
  }, [lat, lon]);

  return (
    <div className='App'>
      <div className='col-lg-4 col-md-8 col-sm-8 backdrop'>
        {(typeof weatherData.main != 'undefined') ? (
          <WeatherCard weatherData={weatherData} />
        ): (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
