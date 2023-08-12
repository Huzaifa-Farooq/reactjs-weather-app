import axios from "axios";


const locationSearchApiUrl = 'https://geocoding-api.open-meteo.com/v1/search';
const forecastApiUrl = 'https://api.open-meteo.com/v1/forecast';


function getSearchSuggestions(searchTerm, callback) {
  const params = {
    name: searchTerm,
    count: 10,
    language: 'en',
    format: 'json'
  };

  return axios.get(locationSearchApiUrl, {
    params: params
  })
    .then(response => {
      callback(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}

function getForecast(latitude, longitude, callback) {
  const params = {
    latitude: latitude,
    longitude: longitude,
    hourly: 'temperature_2m,precipitation_probability,weathercode,windspeed_10m',
    daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    current_weather: true,
    timeformat: 'unixtime',
    timezone: 'GMT',
    // temperature_unit: 'fahrenheit'
  };

  return axios.get(forecastApiUrl, {
    params: params
  })
    .then(response => {
      callback(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}

const API = {
  getSearchSuggestions : getSearchSuggestions,
  getForecast : getForecast
};

export default API;