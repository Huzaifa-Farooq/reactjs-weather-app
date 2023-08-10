import API from '../api/api';


const CurrentWeather = (props) => {
  const latitude = props.latitude || 52.52;
  const longitude = props.longitude || 13.405;

  function a(response){
    console.log(response)
  }

  API.getForecast(latitude, longitude, a);

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <span className="white-text">Madrid</span>
          </div>
          <div className="row">
            <span className="white-text">31°</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="current-weather-icon-div">
            <img src="./images/sun.png" alt="Weather Icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;