const NavigationSidebar = ({ day, iconSrc, weather, temperature }) => {
  return (
    <div class="col-md-1 text-light sidebar gray-bg rounded-div" style={{ width: '90px' }}>
      <div><img src="./images/cloud.png" width={20} height={20}></img></div>
    </div>
  );
};

export default NavigationSidebar ;
