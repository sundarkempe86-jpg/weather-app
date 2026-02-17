'use client';

import { motion, AnimatePresence } from 'framer-motion';

// Mapping local images from your public folder (ensure these files are in your /public folder)
const characterMap = {
  naruto: "/naruto.png", 
  itachi: "/itachi.png", // Using Itachi for rain as per your screenshot
  gojo: "/gojo.png",
  sukuna: "/sukuna.png" // Using Sukuna for storms
};

export default function AnimeWeatherCharacter({ weatherDesc }) {
  const getCharacter = () => {
    const desc = weatherDesc?.toLowerCase() || '';
    
    // 1. Sunny/Clear -> Naruto
    if (desc.includes('sunny') || desc.includes('clear')) {
      return { id: 'naruto', img: characterMap.naruto, alt: 'Naruto' };
    }
    // 2. Rain/Drizzle -> Itachi (The iconic rain character)
    if (desc.includes('rain') || desc.includes('drizzle')) {
      return { id: 'itachi', img: characterMap.itachi, alt: 'Itachi' };
    }
    // 3. Cloudy/Fog -> Gojo
    if (desc.includes('cloud') || desc.includes('fog') || desc.includes('mist')) {
      return { id: 'gojo', img: characterMap.gojo, alt: 'Gojo Satoru' };
    }
    // 4. Storm/Thunder -> Sukuna
    if (desc.includes('storm') || desc.includes('thunder')) {
      return { id: 'sukuna', img: characterMap.sukuna, alt: 'Sukuna' };
    }
    
    return { id: 'naruto', img: characterMap.naruto, alt: 'Naruto' };
  };

  const character = getCharacter();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={character.id}
        initial={{ x: 200, opacity: 0, scale: 0.8 }}
        animate={{ 
          x: 0, 
          opacity: 1, 
          scale: 1,
          y: [0, -15, 0] // Floating animation
        }}
        exit={{ x: 100, opacity: 0, scale: 0.8 }}
        transition={{
          x: { type: "spring", stiffness: 100, damping: 20 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.4 }
        }}
        className="fixed bottom-4 right-4 w-56 h-56 md:w-80 md:h-80 pointer-events-none z-50 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <img 
          src={character.img} 
          alt={character.alt}
          className="w-full h-full object-contain filter brightness-110 contrast-110"
          onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png'; }} 
        />
      </motion.div>
    </AnimatePresence>
  );
}