import React from "react";
import Country from "./components/Country";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [countries, setCountries] = React.useState([]);
  const [filteredCountries, setFilteredCountries] = React.useState([]);

  React.useEffect(async () => {
    const results = await fetch("https://restcountries.com/v2/all");
    const data = await results.json();
    setCountries(data);
  }, []);

  function filter(e) {
    const region = e.target.value;

    setFilteredCountries(() => {
      return countriesEl.filter((country) => {
        return country.props.region === region;
      });
    });
  }

  function search(e) {
    const term = e.target.value.toLowerCase();

    const results = countriesEl.filter((country) => {
      return country.props.name.toLowerCase().includes(term);
    });

    !results.length ? alert("no results") : setFilteredCountries(results);
  }

  const countriesEl = countries.map((country, index) => {
    return (
      <Country
        key={index + 1}
        flag={country.flag}
        name={country.name}
        pop={country.population}
        region={country.region}
        capital={country.capital}
      />
    );
  });

  return (
    <div>
      <header className="header">
        <h1>Where in the world?</h1>
        <button className="header__dark-mode-toggle">
          <FontAwesomeIcon icon={faMoon} />
          Dark Mode
        </button>
      </header>
      <main className="main">
        <div className="container">
          <div className="main__search-container">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              className="main__search"
              placeholder="Search for a country..."
              onChange={(e) => {
                search(e);
              }}
            />
          </div>
          <div className="main__filter-container">
            <select
              className="main__filter"
              defaultValue=""
              onChange={(e) => filter(e)}
            >
              <option value="">Filter by Region</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
          <div className="main__countries">
            {filteredCountries.length ? filteredCountries : countriesEl}
          </div>
        </div>
      </main>
    </div>
  );
}