import React from 'react';
import { useCountry } from './hooks/useCountry';
import CountryList from './components/CountryList';

// Main application component
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
            Click on a country to select it
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
                <img
                  src={selectedCountry.flag}
                  alt={`${selectedCountry.name} flag`}
                  className="w-20 h-13 mx-auto mt-4 rounded shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNTMiIHZpZXdCb3g9IjAgMCA4MCA1MyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iNTMiIGZpbGw9IiNFNUU3RUIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2Ij7wn5SBPjwvdGV4dD48L3N2Zz4=';
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