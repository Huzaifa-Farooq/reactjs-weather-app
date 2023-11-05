import React, { useState } from 'react';
import Cookies from 'js-cookie';


const Settings = ({ settingsObject }) => {
  const [resetCounter, setResetCounter] = useState(0);

  const resetToDefaultUnits = () => {
    settingsObject.forEach(setting => {
      const defaultOption = setting.options.filter(option => option.active)[0].value;
      Cookies.set(setting.identifier, defaultOption);

      console.log(`Resetting ${setting.identifier} to ${defaultOption}`);
    });

    setResetCounter(prevCounter => prevCounter + 1);
  };

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
                identifier={setting.identifier}
                options={setting.options}
              />
            )
          }
          )
        }
      </div>
      <button onClick={resetToDefaultUnits} className='button'>Reset to Default</button>

    </>
  )
}


// const SettingsItem = ({ title, identifier, options }) => {
class SettingsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOption: Cookies.get(this.props.identifier)
    }
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
  }

  componentDidUpdate() {
    const cookieValue = Cookies.get(this.props.identifier);
    if (cookieValue !== this.state.activeOption) {
      this.setState({
        activeOption: cookieValue,
      });
    }
  }

  handleOptionSelect = (option, identifier) => {
    this.setState({ activeOption: option.value });
    // setting cookie for current option
    Cookies.set(identifier, option.value);
  }

  render() {
    const { title, identifier, options } = this.props;
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
                      className={option.value === this.state.activeOption ? "option-div active" : "option-div"}
                      onClick={() => this.handleOptionSelect(option, identifier)}
                    >
                      <span className="option-text">{option.displayText}</span>
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
}


export default Settings;