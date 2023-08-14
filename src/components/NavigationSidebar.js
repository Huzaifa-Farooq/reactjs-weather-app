import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faHome } from '@fortawesome/free-solid-svg-icons'

import React, { useState } from 'react';


const NavigationSidebar = ({ isHomeActive, isSettingsActive, setActiveSection }) => {
  return (
    <div className="text-light sidebar gray-bg rounded-div" 
      style={{ padding: '10px 0px 10px 0px', width: '90px', backgroundColor: 'none' }}>
      <nav className="navbar">
        <div className="position-sticky">
          <ul className="nav flex-column">
            <li className="center-text nav-item">
              <a className={isHomeActive ? "nav-link active white-text" : "nav-link gray-text"} href="#" aria-disabled={isHomeActive}
                onClick={() => setActiveSection('home')}
              >
              <FontAwesomeIcon icon={faHome} className='' /><br />
                  <span>Home</span>
              </a>
            </li>
            <li className="center-text nav-item">
              <a
               className={isSettingsActive ? "nav-link active white-text" : "nav-link gray-text"} href="#" aria-disabled={isSettingsActive}
               onClick={() => setActiveSection('settings')}
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
