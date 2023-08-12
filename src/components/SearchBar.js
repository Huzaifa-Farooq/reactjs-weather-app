import { useState, useEffect, useCallback, useRef } from 'react';



const SearchBar = (props) => {
  const [locationSearchValue, setLocationSearchValue] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  });

  const handleInputChange = useCallback((e) => {
    setLocationSearchValue(e.target.value);
  }, );

  const handleFormSubmit = useCallback((e) => {
    console.log(locationSearchValue);
    props.searchForLocation(locationSearchValue);
    e.preventDefault();
  }, );
  
  const handleLocationSelect = useCallback((e) => {
    // if target is not li then select it's parent element
    const target = e.target.closest('li');
    if (target){
      const location = JSON.parse(target.getAttribute('data'));
      const latitude = location.latitude;
      const longitude = location.longitude;

      props.setLocationCordinates({ latitude, longitude });
      
      const cityNameArray = [location.name, location.admin2, location.admin1, location.country];
      const cityName = cityNameArray.filter((text) => Boolean(text)).join(', ');
      props.setLocationData({
        cityName: cityName,
        countryCode: location.country_code,
      });
    }
  }, []);

  let suggestions = []
  if (props.searchSuggestions.length > 0) { 
    suggestions = props.searchSuggestions.map((suggestion) => {
      const textArray = [suggestion.name, suggestion.admin2, suggestion.admin1, suggestion.country];
      const text = textArray.filter((text) => Boolean(text)).join(', ');
      return (
          <li data={JSON.stringify(suggestion)} onClick={handleLocationSelect} key={suggestion.id} className="list-group-item gray-bg gray-text">
            {text} ({suggestion.timezone && <span>{suggestion.timezone}</span>})
            <p style={{ marginTop: '0px', marginBottom: '0px', fontSize: '12px' }}>
              Lat: {suggestion.latitude} Long: {suggestion.longitude}
            </p>
          </li>
      );
    });
  }

  return (
    <div className="mb-4 col-9">
      <form onSubmit={handleFormSubmit}>
        <input 
          ref={inputRef}
          onFocus={() => setShowSuggestions(true)}
          onChange={handleInputChange} 
          id="location-search" 
          type="text" 
          className="form-control gray-bg rounded-div" 
          placeholder="Search for city"
        />
      </form>
      <div className='mb-3' id='search-suggestion'>
        {suggestions.length && showSuggestions ? <ul className="list-group">{suggestions}</ul> : null}
      </div>
    </div>
  );
}

export default SearchBar;
