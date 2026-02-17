'use client';

import { motion } from 'framer-motion';

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad',
  'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
  'Jaipur', 'Lucknow', 'Kochi', 'Chandigarh'
];

export default function IndianCities({ onCitySelect }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-center">Quick Select Indian Cities</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
        {cities.map((city, i) => (
          <motion.button
            key={city}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCitySelect(city)}
            className="px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 transition-all"
          >
            {city}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
