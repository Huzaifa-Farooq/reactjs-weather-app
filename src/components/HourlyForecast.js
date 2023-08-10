import HourlyForecastItem from './HourlyForecastItem';
import VerticalLine from './VerticalLine';


const HourlyForecast = () => {
  return (
    <div className="gray-bg rounded-div">
      <div className='forcast-name'>
        <span className='gray-text'>Today's forecast</span>
      </div>
      <div className='hourly-forecast-container'>
        <HourlyForecastItem time="6:00 AM" iconSrc="./images/cloud.png" temperature="20°" />
        <VerticalLine />
        <HourlyForecastItem time="6:00 AM" iconSrc="./images/cloud.png" temperature="20°" />
        <VerticalLine />
        <HourlyForecastItem time="6:00 AM" iconSrc="./images/sun.png" temperature="20°" />
        <VerticalLine />
        <HourlyForecastItem time="6:00 AM" iconSrc="./images/cloud.png" temperature="20°" />
        <VerticalLine />
        <HourlyForecastItem time="6:00 AM" iconSrc="./images/cloud.png" temperature="20°" />
        <VerticalLine />
        <HourlyForecastItem time="6:00 AM" iconSrc="./images/sun.png" temperature="20°" />
        <VerticalLine />
        <HourlyForecastItem time="6:00 AM" iconSrc="./images/sun.png" temperature="20°" />
        <VerticalLine />
        <HourlyForecastItem time="6:00 AM" iconSrc="./images/sun.png" temperature="20°" />
        <VerticalLine />
        <HourlyForecastItem time="6:00 AM" iconSrc="./images/sun.png" temperature="20°" />
        <VerticalLine />
        <HourlyForecastItem time="6:00 AM" iconSrc="./images/sun.png" temperature="20°" />
        <VerticalLine />
        <HourlyForecastItem time="6:00 AM" iconSrc="./images/sun.png" temperature="20°" />

      </div>
    </div>
  );
};

export default HourlyForecast;
