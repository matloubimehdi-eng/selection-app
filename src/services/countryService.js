// Add this helper function to debug paths
const getFlagPath = (countryCode) => {
  const isDev = process.env.NODE_ENV === 'development';
  const basePath = process.env.PUBLIC_URL || '';
  
  // Log the actual path being used
  const path = `${basePath}/flags/${countryCode}.png`;
  if (isDev) {
    console.log(`Flag path for ${countryCode}:`, path);
  }
  return path;
};

export const COUNTRIES = [
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: getFlagPath('uk'),
    code: 'GB'
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: getFlagPath('germany'),
    code: 'DE'
  },
  {
    id: 'italy',
    name: 'Italy',
    flag: getFlagPath('italy'),
    code: 'IT'
  },
  {
    id: 'spain',
    name: 'Spain',
    flag: getFlagPath('spain'),
    code: 'ES'
  }
];

export const countryService = {
  fetchCountries: async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return COUNTRIES;
  }
};