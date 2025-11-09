import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CountryItem = ({ country, isSelected, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  
  // Better fallback SVG
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='32' viewBox='0 0 48 32'><rect width='48' height='32' fill='%23E5E7EB'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='Arial' font-size='10'>🌍</text></svg>`;

  return (
    <li
      onClick={() => onSelect(country)}
      className={`
        flex items-center p-4 mb-3 rounded-lg cursor-pointer border-2
        transition-all duration-300 ease-in-out transform
        hover:scale-105 hover:shadow-md
        ${
          isSelected
            ? 'bg-blue-100 border-blue-500 shadow-lg'
            : 'bg-white border-gray-200 hover:border-blue-300'
        }
      `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(country);
        }
      }}
      aria-pressed={isSelected}
    >
      {!imageError ? (
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="w-12 h-8 mr-4 rounded shadow-sm object-cover"
          onError={(e) => {
            console.warn(`Failed to load flag: ${country.flag}`);
            setImageError(true);
          }}
        />
      ) : (
        <div className="w-12 h-8 mr-4 rounded shadow-sm bg-gray-200 flex items-center justify-center text-xs">
          {country.code}
        </div>
      )}
      <span className="text-lg font-medium text-gray-800">
        {country.name}
      </span>
    </li>
  );
};

CountryItem.propTypes = {
  country: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CountryItem;