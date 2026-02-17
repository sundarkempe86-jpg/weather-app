'use client';

import { motion } from 'framer-motion';
import { Droplets, Wind, Eye } from 'lucide-react';

export default function WeatherCard({ weather, unit }) {
  if (!weather) return null;

  const getTemp = () => {
    if (unit === 'metric') return `${weather.current.temperature}°C`;
    if (unit === 'imperial') return `${Math.round(weather.current.temperature * 9/5 + 32)}°F`;
    return `${weather.current.temperature + 273.15}K`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
    >
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold mb-2">{weather.location.name}</h2>
        <p className="text-lg opacity-80">{weather.location.country}</p>
      </div>

      <div className="flex justify-center items-center mb-6">
        <img src={weather.current.weather_icons[0]} alt="weather" className="w-24 h-24" />
      </div>

      <motion.div
        key={unit}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-center mb-6"
      >
        <p className="text-6xl font-bold">{getTemp()}</p>
        <p className="text-xl mt-2 opacity-90">{weather.current.weather_descriptions[0]}</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-3 gap-4"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center"
        >
          <Droplets className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm opacity-70">Humidity</p>
          <p className="text-lg font-semibold">{weather.current.humidity}%</p>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center"
        >
          <Wind className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm opacity-70">Wind</p>
          <p className="text-lg font-semibold">{weather.current.wind_speed} km/h</p>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center"
        >
          <Eye className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm opacity-70">Visibility</p>
          <p className="text-lg font-semibold">{weather.current.visibility} km</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
