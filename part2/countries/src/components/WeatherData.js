import { useEffect, useState } from "react";
import axios from "axios";

const WeatherData = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${country.latlng[0]}&longitude=${country.latlng[1]}&daily=temperature_2m_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles`
      )
      .then((response) => setWeather(response.data));
  }, []);

  return (
    <div>
      <h3>Weather in {country.name.common}</h3>
      <p>elevation {weather.elevation}</p>
    </div>
  );
};

export default WeatherData;
