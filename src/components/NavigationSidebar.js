import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faHome } from '@fortawesome/free-solid-svg-icons'

import React, { useState } from 'react';


const NavigationSidebar = () => {
  const [isHomeActive, setIsHomeActive] = useState(true);
  const [isSettingsActive, setIsSettingsActive] = useState(false);

  const handleClick = (opt) => {
    switch (opt) {
      case 'home':
        setIsHomeActive(true);
        setIsSettingsActive(false);
        break;
      case 'settings':
        setIsHomeActive(false);
        setIsSettingsActive(true);
        break;
      default:
        break;
    }
  }

  return (
    <div className="text-light sidebar gray-bg rounded-div" 
      style={{ padding: '10px 0px 10px 0px', width: '90px', backgroundColor: 'none' }}>
      <nav className="navbar">
        <div className="position-sticky">
          <ul className="nav flex-column">
            <li className="center-text nav-item">
              <a className={isHomeActive ? "nav-link active white-text" : "nav-link gray-text"} href="#" aria-disabled={isHomeActive}
                onClick={() => handleClick('home')}
              >
              <FontAwesomeIcon icon={faHome} className='' /><br />
                  <span>Home</span>
              </a>
            </li>
            <li className="center-text nav-item">
              <a
               className={isSettingsActive ? "nav-link active white-text" : "nav-link gray-text"} href="#" aria-disabled={isSettingsActive}
               onClick={() => handleClick('settings')}
               >
                <FontAwesomeIcon icon={faSliders} className='' /><br />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavigationSidebar;
