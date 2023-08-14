import React, { useState } from 'react';


const Settings = () => {
  const settingsObject = [
    {
      title: "Temperature",
      options: [
        { value: "Celcius", active: true },
        { value: "Fahrenhote", active: false },
      ]
    },
    {
      title: "Wind Speed",
      options: [
        { value: "Km/h", active: true },
        { value: "m/s", active: false },
        { value: "Mph", active: false },
        { value: "Knots", active: false },
      ]
    },
    {
      title: "Precipitation",
      options: [
        { value: "Milimeters", active: true },
        { value: "Inches", active: false },
      ]
    }
  ];
  return (
    <>
      <span className="white-text">
        Units
      </span>
      <div className="text-light gray-bg rounded-div">
        {
          settingsObject.map((setting, index) => {
            return (
              <SettingsItem
                key={index}
                title={setting.title}
                options={setting.options}
              />
            )
          }
          )
        }
      </div></>
  )
}


const SettingsItem = ({ title, options }) => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(
    options.findIndex(option => option.active === true)
  );

  const colClass = "col-" + Math.floor(12 / options.length);

  return (
    <div style={{ marginBottom: '10px' }}>
    <div className='forcast-name' style={{ marginBottom: '5px' }}>
      <span style={{ textDecoration: 'none' }} className='gray-text'>{title}</span>
    </div>
    <div className="dark-bg rounded-div">
      <div className="options row">
        {
          options.map((option, index) => {
            return (
              <div className={"option " + colClass} key={index}>
                <div
                  className={index === activeOptionIndex ? "option-div active" : "option-div"}
                  onClick={() => setActiveOptionIndex(index)}
                 >
                  <span className="option-text">{option.value}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  </div>
  )
}


export default Settings;