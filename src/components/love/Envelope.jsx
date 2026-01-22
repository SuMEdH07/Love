import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoupleKissing from './CoupleKissing';
import Proposal from './Proposal';

const Envelope = ({ onOpen, message, setMessage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 2500);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen perspective-1000 gap-8 md:gap-20">
      {/* Left Animation */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            className="hidden md:block"
          >
            <CoupleKissing />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        <motion.div
          className="relative w-56 h-36 sm:w-72 sm:h-48 md:w-96 md:h-64 bg-[#ec4899] rounded-b-md shadow-2xl z-10"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
          style={{
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
          }}
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] rounded-b-md pointer-events-none"></div>

          {/* Envelope Flap (Top) */}
          <motion.div
            className="relative absolute top-0 left-0 w-full h-0 border-l-[112px] sm:border-l-[144px] md:border-l-[192px] border-r-[112px] sm:border-r-[144px] md:border-r-[192px] border-t-[76px] sm:border-t-[98px] md:border-t-[130px] border-l-transparent border-r-transparent border-t-[#be185d] origin-top z-30 drop-shadow-lg"
            animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ filter: "brightness(1.1)" }}
          >
            {/* Flap Texture */}
            <div className="absolute -top-[76px] sm:-top-[98px] md:-top-[130px] -left-[112px] sm:-left-[144px] md:-left-[192px] w-[224px] sm:w-[288px] md:w-[384px] h-[76px] sm:h-[98px] md:h-[130px] opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}></div>

            {/* Heart Seal */}
            <div className="absolute -top-[46px] sm:-top-[60px] md:-top-[80px] -left-[15px] sm:-left-[19px] md:-left-[25px] text-red-600 drop-shadow-md">
              <svg className="w-[30px] h-[30px] sm:w-[38px] sm:h-[38px] md:w-[50px] md:h-[50px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </motion.div>

          {/* Envelope Body (Left Fold) */}
          <div className="absolute top-0 left-0 w-0 h-full border-l-[112px] sm:border-l-[144px] md:border-l-[192px] border-b-[72px] sm:border-b-[96px] md:border-b-[128px] border-t-[72px] sm:border-t-[96px] md:border-t-[128px] border-l-[#ec4899] border-b-transparent border-t-transparent rounded-bl-md z-20 pointer-events-none filter brightness-95"></div>

          {/* Envelope Body (Right Fold) */}
          <div className="absolute top-0 right-0 w-0 h-full border-r-[112px] sm:border-r-[144px] md:border-r-[192px] border-b-[72px] sm:border-b-[96px] md:border-b-[128px] border-t-[72px] sm:border-t-[96px] md:border-t-[128px] border-r-[#ec4899] border-b-transparent border-t-transparent rounded-br-md z-20 pointer-events-none filter brightness-90"></div>

          {/* Envelope Body (Bottom Fold) */}
          <div className="absolute bottom-0 left-0 w-full h-0 border-l-[112px] sm:border-l-[144px] md:border-l-[192px] border-r-[112px] sm:border-r-[144px] md:border-r-[192px] border-b-[72px] sm:border-b-[96px] md:border-b-[128px] border-l-transparent border-r-transparent border-b-[#be185d] rounded-b-md z-20 pointer-events-none filter drop-shadow-sm"></div>
        </motion.div>


      </div>

      {/* Right Animation */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 1 }}
            className="block order-first md:order-none mb-8 md:mb-0"
          >
            <Proposal onYes={handleOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chocolate Pop-up Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Chocolate Card */}
            <motion.div
              className="relative z-10 p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl w-[95%] sm:w-[85%] max-w-sm sm:max-w-md border-4 border-white/20"
              initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 10, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring", bounce: 0.4 }}
              style={{
                background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
              }}
            >
              <div className="bg-white/10 p-4 rounded-xl">
                <motion.img
                  src="/Love/dairy_milk_v2.png"
                  alt="Dairy Milk Chocolate"
                  className="w-full h-auto min-h-[220px] mx-auto object-contain drop-shadow-2xl"
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, type: "spring", bounce: 0.3 }}
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                    e.target.style.border = "2px solid red";
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Envelope;
