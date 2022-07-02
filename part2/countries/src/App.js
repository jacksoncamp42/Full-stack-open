import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import CountryData from "./components/CountryData";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilterChange = (event) => {
    if (true) {
    }
    const search = event.target.value;
    setFilter(event.target.value);
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </div>
      {countriesToShow.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <div>
          {countriesToShow.length === 1 ? (
            <CountryData country={countriesToShow[0]} />
          ) : (
            <Countries
              countriesToShow={countriesToShow}
              setCountriesToShow={setCountriesToShow}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
