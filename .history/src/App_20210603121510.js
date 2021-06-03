import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/weather';

export default function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }

    fetchData();

  }, [lat,long])
  
  /*
    You can see that I've included a check in the return statement. 
    If the type of data we are getting is undefined, it will show us an empty div. 
    And since the fetch data is an async function, it's mandatory to include this check. 
    It loads the function after all other functions are done executing. 
    So, if you remove this check, you will get an error.
    This is because our application renders the return statement before the API call is made, 
    and there is nothing to show in that case so it throws an undefined error.

    More about async/await: https://www.freecodecamp.org/news/async-await-in-javascript/
  */

  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div></div>
      )}
      
    </div>
  );
}