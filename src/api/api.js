import axios from "axios";


const locationSearchApiUrl = 'https://geocoding-api.open-meteo.com/v1/search';
const forecastApiUrl = 'https://api.open-meteo.com/v1/forecast';
const historialApiUrl = 'https://archive-api.open-meteo.com/v1/archive';


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
    hourly: 'temperature_2m,precipitation_probability,precipitation,weathercode,windspeed_10m,relativehumidity_2m,apparent_temperature',
    daily: 'weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,precipitation_sum,windspeed_10m_max,sunrise,sunset',
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

function getDailyHistoricalData(
  latitude, longitude, startDate, endDate, dailyParams, callback, units
){
  // if startDate and endDate are not in ISO8601 format convert them
  if (startDate instanceof Date) {
    startDate = startDate.toISOString().split('T')[0];
  }
  if (endDate instanceof Date) {
    endDate = endDate.toISOString().split('T')[0];
  }

  const params = {
    latitude: latitude,
    longitude: longitude,
    daily: dailyParams.join(","),
    start_date: startDate,
    end_date: endDate,
    timeformat: 'unixtime',
    timezone: 'GMT',
  };
  if (units) {
    // iterating over unit object
    for (const [key, value] of Object.entries(units)) {
      params[key] = value;
    }
  }

  return axios.get(historialApiUrl, {
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
  getForecast : getForecast,
  getDailyHistoricalData : getDailyHistoricalData
};

export default API;