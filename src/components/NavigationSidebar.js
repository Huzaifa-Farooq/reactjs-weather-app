import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faHome, faClock } from '@fortawesome/free-solid-svg-icons'

import React, { useState } from 'react';




const NavigationSidebar = ({ activeSectionName, setActiveSection }) => {

  const options = [
    { name: 'home', title: 'Home', icon: faHome },
    { name: 'historical-data', title: 'Historical', icon: faClock },
    { name: 'settings', title: 'Settings', icon: faSliders },
  ]

  return (
    <div className="text-light sidebar gray-bg rounded-div"
      style={{ padding: '10px 0px 10px 0px', marginBottom: '10px', width: '90px', backgroundColor: 'none', position: 'fixed' }}>
      <nav className="navbar">
        <div className="position-sticky">
          <ul className="nav flex-column">
            {
              options.map((option, index) => {
                const isActive = activeSectionName === option.name;
                return (
                  <li className="center-text nav-item" key={index}>
                    <a className={isActive ? "nav-link active white-text" : "nav-link gray-text"} href="#" aria-disabled={isActive}
                      onClick={() => setActiveSection(option.name)}
                    >
                      <FontAwesomeIcon icon={option.icon} className='' /><br />
                      <span>{option.title}</span>
                    </a>
                  </li>
                );
              }
              )
            }
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavigationSidebar;
