import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingStickers = () => {
    const stickers = useMemo(() => {
        const emojis = ['🌹', '🧸', '💌', '🍫', '💋', '💝', '🎀', '🦢'];
        return [...Array(12)].map((_, i) => ({
            id: i,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            x: Math.random() * 90 + 5, // 5-95%
            y: Math.random() * 90 + 5, // 5-95%
            duration: 5 + Math.random() * 5,
            delay: Math.random() * 2,
            scale: 0.8 + Math.random() * 0.5
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
            {stickers.map((sticker) => (
                <motion.div
                    key={sticker.id}
                    className="absolute text-4xl md:text-6xl opacity-40 filter drop-shadow-md"
                    style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [sticker.scale, sticker.scale * 1.1, sticker.scale]
                    }}
                    transition={{
                        duration: sticker.duration,
                        repeat: Infinity,
                        delay: sticker.delay,
                        ease: "easeInOut"
                    }}
                >
                    {sticker.emoji}
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingStickers;
