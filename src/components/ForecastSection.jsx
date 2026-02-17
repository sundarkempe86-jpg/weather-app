'use client';

import { motion } from 'framer-motion';

export default function ForecastSection({ currentTemp, unit }) {
  if (!currentTemp) return null;

  const generateForecast = () => {
    const days = ['Tomorrow', 'Day 2', 'Day 3'];
    return days.map((day, i) => {
      const tempVariation = Math.floor(Math.random() * 7) - 3;
      const temp = currentTemp + tempVariation;
      const rain = Math.floor(Math.random() * 101);
      
      const getDisplayTemp = () => {
        if (unit === 'metric') return `${temp}°C`;
        if (unit === 'imperial') return `${Math.round(temp * 9/5 + 32)}°F`;
        return `${temp + 273.15}K`;
      };

      return { day, temp: getDisplayTemp(), rain };
    });
  };

  const forecast = generateForecast();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-8"
    >
      <h3 className="text-2xl font-bold mb-4">3-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {forecast.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center"
          >
            <p className="text-lg font-semibold mb-2">{item.day}</p>
            <p className="text-3xl font-bold mb-2">{item.temp}</p>
            <p className="text-sm opacity-70">Rain: {item.rain}%</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
