
const CurrentWeather = (props) => {
  const currentWeather = props.currentWeather;
  const cityName = props.selectedLocationInfo.cityName;
  const countryCode = props.selectedLocationInfo.countryCode;

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="row mb-3">
            <h2 style={{ fontWeight: '600' }}>
              <span className="white-text">{cityName}</span>
              <sub style={{ marginLeft: '5px', fontSize: '12px' }} className="white-text">{countryCode}</sub>
            </h2>
          </div>
          <div className="row">
            <h1 style={{ fontWeight: '600' }} className="white-text">{currentWeather.temperature}°</h1>
          </div>
        </div>
        <div className="col-md-6">
          <div className="current-weather-icon-div">
            <img src={currentWeather.iconSrc} alt={currentWeather.description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;