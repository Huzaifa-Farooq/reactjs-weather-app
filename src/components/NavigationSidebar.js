const NavigationSidebar = () => {
  return (
    <div className="col-md-1 text-light sidebar gray-bg rounded-div" 
      style={{ padding: '10px 0px 10px 0px', width: '90px', backgroundColor: 'none' }}>
      <nav class="navbar">
        <div className="position-sticky">
          <ul class="nav flex-column">
            <li class="center-text nav-item">
              <a class="nav-link active white-text" href="#" aria-disabled>
                <i className="wi wi-day-cloudy"></i>
                  <span>Home</span>
              </a>
            </li>
            <li class="center-text nav-item">
              <a class="nav-link gray-text" href="#">
                <i className="wi wi-day-cloudy"></i>
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
