import DailyForecastItem from './DailyForecastItem';



const DailyForecast = (props) => {
  const dailyForecast = props.dailyForecast;

  return (
    <div className="sidebar">
      <div className="gray-bg rounded-div">
        <div className='forcast-name'>
          <span className='gray-text'>Daily forecast</span>
        </div>
        <div className='daily-forecast-container'>
          {
            dailyForecast.map((data, index) => {
              return <>
                <DailyForecastItem
                  key={index}
                  day={data.time.toLocaleString('en-US', { weekday: 'short' })}
                  iconSrc={data.iconSrc}
                  description={data.description}
                  temperatureMax={data.temperature_2m_max}
                  temperatureMin={data.temperature_2m_min}
                />
                <hr className='gray-text' />
              </>
            })
          }
        </div>
      </div>
    </div>
  );
};


export default DailyForecast;