'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { fetchWeatherByCity, fetchWeatherByCoords } from '@/services/weatherService';
import WeatherCard from '@/components/WeatherCard';
import ForecastSection from '@/components/ForecastSection';
import SearchBar from '@/components/SearchBar';
import IndianCities from '@/components/IndianCities';
import AnimeWeatherCharacter from '@/components/AnimeWeatherCharacter';
import WeatherOverlay from '@/components/WeatherOverlay';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const { theme, toggleTheme } = useTheme();

  const getBackground = () => {
    if (!weather) return 'from-blue-400 to-blue-600';
    
    const desc = weather.current.weather_descriptions[0].toLowerCase();
    if (desc.includes('sunny') || desc.includes('clear')) {
      return 'from-yellow-400 via-orange-400 to-sky-400';
    }
    if (desc.includes('rain') || desc.includes('drizzle')) {
      return 'from-slate-700 via-slate-800 to-blue-900';
    }
    if (desc.includes('cloud')) {
      return 'from-gray-400 via-gray-500 to-slate-400';
    }
    return 'from-blue-400 to-blue-600';
  };

  const fetchWeather = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCity(query);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLoading(true);
          try {
            const data = await fetchWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeather(data);
          } catch (err) {
            setError(err.message);
            fetchWeather('London');
          } finally {
            setLoading(false);
          }
        },
        () => fetchWeather('London')
      );
    } else {
      fetchWeather('London');
    }
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackground()} ${theme === 'dark' ? 'brightness-75' : ''} transition-all duration-700 relative overflow-hidden`}>
      {weather && <WeatherOverlay weatherDesc={weather.current.weather_descriptions[0]} />}
      {weather && <AnimeWeatherCharacter weatherDesc={weather.current.weather_descriptions[0]} />}
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Weather App</h1>
          
          <div className="flex gap-4 items-center">
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white focus:outline-none"
            >
              <option value="metric">Celsius</option>
              <option value="imperial">Fahrenheit</option>
              <option value="scientific">Kelvin</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400 }}
              onClick={toggleTheme}
              className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        <SearchBar onSearch={fetchWeather} loading={loading} />
        <IndianCities onCitySelect={fetchWeather} />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 backdrop-blur-xl border border-red-500/40 rounded-2xl p-4 mb-8 text-center"
          >
            <p className="text-white">{error}</p>
          </motion.div>
        )}

        {loading && (
          <div className="text-center text-white text-xl">Loading...</div>
        )}

        {weather && (
          <div className="max-w-4xl mx-auto">
            <WeatherCard weather={weather} unit={unit} />
            <ForecastSection currentTemp={weather.current.temperature} unit={unit} />
          </div>
        )}
      </div>
    </div>
  );
}
