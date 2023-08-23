
const CurrentWeather = (props) => {
  const currentWeather = props.currentWeather;
  const cityName = props.selectedLocationInfo.cityName;
  const countryCode = props.selectedLocationInfo.countryCode;

  const units = props.units;
  const showLocation = props.showLocation || true;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          {
            showLocation && countryCode && (
            <div className="row mb-3">
              <h2 className="white-text" style={{ fontWeight: '600' }}>
                <span>{cityName}</span>
                <sub style={{ marginLeft: '5px', fontSize: '12px' }}>
                  &nbsp;
                  <img 
                    src={`https://hatscripts.github.io/circle-flags/flags/${countryCode.toLowerCase()}.svg`} 
                    width={18} 
                    height={18}
                  />
                  &nbsp;
                  {countryCode}
                  </sub>
              </h2>
            </div>
            )
          }
          <div className="row mb-3">
            <h3 className="white-text">
              <span>{currentWeather.description}</span>
            </h3>
          </div>
          <div className="row">
            <h1 style={{ fontWeight: '600' }} className="white-text">
              {currentWeather.temperature} {units.temperature_unit}
            </h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="current-weather-icon-div">
            <img src={currentWeather.iconSrc} alt={currentWeather.description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;