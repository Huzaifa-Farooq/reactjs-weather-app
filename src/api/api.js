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

function getForecast(
  latitude, longitude, callback, units
  ) {
  const params = {
    latitude: latitude,
    longitude: longitude,
    hourly: 'temperature_2m,precipitation_probability,weathercode,windspeed_10m,relativehumidity_2m,apparent_temperature',
    daily: 'weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,windspeed_10m_max',
    current_weather: true,
    timeformat: 'unixtime',
    timezone: 'GMT',
  };
  if (units) {
    // iterating over unit object
    for (const [key, value] of Object.entries(units)) {
      params[key] = value;
    }
  }

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