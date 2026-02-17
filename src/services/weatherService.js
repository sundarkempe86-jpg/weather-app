import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherstack.com/current';

const weatherAPI = axios.create({
  baseURL: BASE_URL,
  params: { access_key: API_KEY }
});

const handleError = (error) => {
  if (error.response?.data?.error?.code === 105) {
    return 'HTTPS is not supported on the free plan. Please use HTTP endpoint.';
  }
  return error.response?.data?.error?.info || 'Failed to fetch weather data';
};

export const fetchWeatherByCity = async (city) => {
  try {
    const { data } = await weatherAPI.get('', { params: { query: city } });
    if (data.error) throw new Error(data.error.info);
    return data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const { data } = await weatherAPI.get('', { params: { query: `${lat},${lon}` } });
    if (data.error) throw new Error(data.error.info);
    return data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
