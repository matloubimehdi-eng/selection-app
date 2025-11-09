// Service layer with new countries and capitals
const getFlagPath = (countryCode) => {
  const basePath = process.env.PUBLIC_URL || '';
  return `${basePath}/flags/${countryCode}.png`;
};

export const COUNTRIES = [
  {
    id: 'iran',
    name: 'Iran',
    capital: 'Tehran',
    flag: getFlagPath('iran'),
    code: 'IR'
  },
  {
    id: 'turkey',
    name: 'Turkey',
    capital: 'Ankara',
    flag: getFlagPath('turkey'),
    code: 'TR'
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    capital: 'Amsterdam',
    flag: getFlagPath('netherlands'),
    code: 'NL'
  },
  {
    id: 'canada',
    name: 'Canada',
    capital: 'Ottawa',
    flag: getFlagPath('canada'),
    code: 'CA'
  },
  {
    id: 'sweden',
    name: 'Sweden',
    capital: 'Stockholm',
    flag: getFlagPath('sweden'),
    code: 'SE'
  }
];

export const countryService = {
  fetchCountries: async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return COUNTRIES;
  }
};