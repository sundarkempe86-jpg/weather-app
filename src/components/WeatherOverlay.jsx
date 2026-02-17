'use client';

import { motion } from 'framer-motion';

export default function WeatherOverlay({ weatherDesc }) {
  const desc = weatherDesc?.toLowerCase() || '';
  const isRain = desc.includes('rain') || desc.includes('drizzle');
  const isSunny = desc.includes('sunny') || desc.includes('clear');
  const isStorm = desc.includes('storm') || desc.includes('thunder');

  return (
    <>
      {isRain && (
        <div className="rain-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {isSunny && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="fixed top-10 right-10 w-32 h-32 pointer-events-none z-40"
        >
          <div className="absolute inset-0 bg-gradient-radial from-yellow-300/40 via-orange-300/20 to-transparent rounded-full blur-2xl" />
          <div className="absolute inset-4 bg-gradient-radial from-yellow-400/60 via-orange-400/30 to-transparent rounded-full blur-xl" />
        </motion.div>
      )}

      {isStorm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 3 }}
          className="fixed inset-0 bg-white/20 pointer-events-none z-30"
        />
      )}
    </>
  );
}
