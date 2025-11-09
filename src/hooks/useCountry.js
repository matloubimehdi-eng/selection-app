import { useState, useEffect, useCallback } from 'react';
import { countryService } from '../services/countryService';

// Custom hook encapsulates all country-related state and logic
export const useCountry = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await countryService.fetchCountries();
        setCountries(data);
      } catch (error) {
        console.error('Failed to load countries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const selectCountry = useCallback((country) => {
    setSelectedCountry(country);
  }, []);

  return {
    countries,
    selectedCountry,
    loading,
    selectCountry
  };
};