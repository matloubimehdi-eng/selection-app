import React from 'react';
import PropTypes from 'prop-types';
import CountryItem from './CountryItem';

// Container component for the list of countries
const CountryList = ({ countries, selectedCountry, onCountrySelect }) => {
  if (!countries || countries.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No countries available
      </div>
    );
  }

  return (
    <ul className="list-none p-0 max-w-2xl mx-auto">
      {countries.map((country) => (
        <CountryItem
          key={country.id}
          country={country}
          isSelected={selectedCountry?.id === country.id}
          onSelect={onCountrySelect}
        />
      ))}
    </ul>
  );
};

CountryList.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      flag: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedCountry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  }),
  onCountrySelect: PropTypes.func.isRequired
};

export default CountryList;