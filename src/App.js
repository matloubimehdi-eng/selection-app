import React, { useState } from 'react';
import { useCountry } from './hooks/useCountry';
import CountryList from './components/CountryList';

const App = () => {
  const { countries, selectedCountry, loading, selectCountry } = useCountry();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Country Selector
          </h1>
          <p className="text-gray-600">
            Click on a country to see its capital
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <CountryList
              countries={countries}
              selectedCountry={selectedCountry}
              onCountrySelect={selectCountry}
            />

            {selectedCountry && (
              <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Selected Country
                </h2>
                <p className="text-3xl text-blue-600 font-bold">
                  {selectedCountry.name}
                </p>
                <p className="text-xl text-gray-700 mt-2">
                  Capital: <span className="font-semibold">{selectedCountry.capital}</span>
                </p>
                <img
                  src={selectedCountry.flag}
                  alt={`${selectedCountry.name} flag`}
                  className="w-20 h-13 mx-auto mt-4 rounded shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='53' viewBox='0 0 80 53'><rect width='80' height='53' fill='%23E5E7EB'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='Arial' font-size='16'>🌍</text></svg>`;
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;