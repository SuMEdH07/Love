import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import vintageRose from '../../assets/love/vintage-rose.jpg';

const Slideshow = ({ message, setMessage }) => {
    // Auto-import images from assets/love folder
    const imagesGlob = import.meta.glob('../../assets/love/*.{png,jpg,jpeg,svg}', { eager: true });
    const images = Object.values(imagesGlob).map((img) => img.default).filter(src => !src.includes('vintage-rose'));

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Fallback if no images are found
    const hasImages = images.length > 0;
    const displayImages = hasImages ? images : [
        "https://placehold.co/400x400/pink/white?text=Photo+1",
        "https://placehold.co/400x400/red/white?text=Photo+2",
        "https://placehold.co/400x400/purple/white?text=Photo+3",
        "https://placehold.co/400x400/orange/white?text=Photo+4",
        "https://placehold.co/400x400/blue/white?text=Photo+5",
        "https://placehold.co/400x400/green/white?text=Photo+6",
    ];

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.log("Auto-play prevented:", error);
                });
            }
        }
    }, []);

    // Responsive positioning logic
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        let timeoutId;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowSize({ width: window.innerWidth, height: window.innerHeight });
            }, 100);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    const isMobile = windowSize.width < 768;

    // Generate positions based on screen size
    const photosToDisplay = isMobile ? displayImages.slice(0, 4) : displayImages; // Reduce to 4 photos on mobile

    const photoPositions = photosToDisplay.map((_, i) => {
        if (isMobile) {
            // Mobile: Stacked or simpler layout
            const angle = (i / photosToDisplay.length) * 2 * Math.PI;
            const radius = 120 + Math.random() * 40;
            return {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius + 180, // Shift down
                rotate: Math.random() * 20 - 10,
                delay: i * 0.1,
                scale: 0.6
            };
        } else {
            // Desktop: Scattered but STRICTLY bounded
            const photoWidth = 200; // Reduced size for better fit
            const photoHeight = 240;
            const padding = 20;

            // Dynamic radius based on screen size
            const minDimension = Math.min(windowSize.width, windowSize.height);
            const minRadius = minDimension * 0.25; // 25% of screen min dimension
            const maxRadius = minDimension * 0.45; // 45% of screen min dimension

            // Ensure min < max
            const safeMinRadius = Math.min(minRadius, maxRadius - 10);
            const radius = safeMinRadius + Math.random() * (maxRadius - safeMinRadius);

            const angle = (i / photosToDisplay.length) * 2 * Math.PI;

            let x = Math.cos(angle) * radius;
            let y = Math.sin(angle) * radius;

            // Strict clamping to viewport
            const maxX = (windowSize.width / 2) - (photoWidth / 2) - padding;
            const maxY = (windowSize.height / 2) - (photoHeight / 2) - padding;

            x = Math.max(-maxX, Math.min(maxX, x));
            y = Math.max(-maxY, Math.min(maxY, y));

            return {
                x,
                y,
                rotate: Math.random() * 30 - 15,
                delay: i * 0.2,
                scale: 1
            };
        }
    });

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Music */}
            <audio ref={audioRef} loop>
                <source src="/love-song.mp3" type="audio/mp3" />
            </audio>

            {/* Music Control */}
            <button
                onClick={toggleMusic}
                className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            >
                {isPlaying ? "🎵" : "🔇"}
            </button>

            {/* Vintage Letter Center */}
            <motion.div
                className="relative z-20 w-[90%] md:w-[600px] h-[70vh] md:h-[700px] bg-[#f0e6d2] shadow-2xl rounded-sm p-8 md:p-12 flex flex-col will-change-transform"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                style={{
                    boxShadow: "inset 0 0 60px rgba(160, 82, 45, 0.15), 0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(160, 82, 45, 0.1)",
                }}
            >
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-60 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none rounded-sm mix-blend-multiply"></div>

                {/* Decorative Realistic Roses (Top Left) */}
                <div className="absolute -top-4 -left-4 z-30 pointer-events-none">
                    <img
                        src={vintageRose}
                        alt="Vintage Rose"
                        className="w-20 h-20 object-cover transform -rotate-45 opacity-90 mix-blend-multiply filter contrast-125 saturate-150"
                    />
                    <img
                        src={vintageRose}
                        alt="Vintage Rose"
                        className="absolute top-6 left-6 w-14 h-14 object-cover transform rotate-12 opacity-80 mix-blend-multiply filter contrast-125 saturate-150"
                    />
                </div>

                {/* Decorative Realistic Roses (Top Right) */}
                <div className="absolute -top-4 -right-4 z-30 pointer-events-none">
                    <img
                        src={vintageRose}
                        alt="Vintage Rose"
                        className="w-20 h-20 object-cover transform rotate-45 opacity-90 mix-blend-multiply filter contrast-125 saturate-150"
                    />
                    <img
                        src={vintageRose}
                        alt="Vintage Rose"
                        className="absolute top-6 right-6 w-14 h-14 object-cover transform -rotate-12 opacity-80 mix-blend-multiply filter contrast-125 saturate-150"
                    />
                </div>

                {/* Decorative Realistic Roses (Bottom Left) */}
                <div className="absolute -bottom-4 -left-4 z-30 pointer-events-none">
                    <img
                        src={vintageRose}
                        alt="Vintage Rose"
                        className="w-20 h-20 object-cover transform -rotate-135 opacity-90 mix-blend-multiply filter contrast-125 saturate-150"
                    />
                    <img
                        src={vintageRose}
                        alt="Vintage Rose"
                        className="absolute bottom-6 left-6 w-14 h-14 object-cover transform rotate-180 opacity-80 mix-blend-multiply filter contrast-125 saturate-150"
                    />
                </div>

                {/* Decorative Realistic Roses (Bottom Right) */}
                <div className="absolute -bottom-4 -right-4 z-30 pointer-events-none">
                    <img
                        src={vintageRose}
                        alt="Vintage Rose"
                        className="w-20 h-20 object-cover transform rotate-135 opacity-90 mix-blend-multiply filter contrast-125 saturate-150"
                    />
                    <img
                        src={vintageRose}
                        alt="Vintage Rose"
                        className="absolute bottom-6 right-6 w-14 h-14 object-cover transform rotate-180 opacity-80 mix-blend-multiply filter contrast-125 saturate-150"
                    />
                </div>

                <div className="relative z-10 w-full h-full overflow-y-auto custom-scrollbar p-4">
                    <textarea
                        className="w-full h-full resize-none border-none outline-none bg-transparent font-handwriting text-xl md:text-2xl text-gray-800 leading-[36px] text-center"
                        value={message}
                        readOnly={true}
                        style={{ lineHeight: "36px" }}
                    />
                </div>
            </motion.div>

            {/* Scattered Photos */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {photosToDisplay.map((src, index) => (
                    <motion.div
                        key={index}
                        className="absolute p-2 md:p-3 bg-white shadow-lg transform pointer-events-auto cursor-grab active:cursor-grabbing will-change-transform"
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{
                            opacity: 1,
                            scale: photoPositions[index].scale,
                            x: photoPositions[index].x,
                            y: photoPositions[index].y,
                            rotate: photoPositions[index].rotate
                        }}
                        drag
                        dragConstraints={{ left: -windowSize.width / 2, right: windowSize.width / 2, top: -windowSize.height / 2, bottom: windowSize.height / 2 }}
                        whileDrag={{ scale: 1.1, zIndex: 40, cursor: "grabbing" }}
                        transition={{
                            delay: 0.5 + photoPositions[index].delay,
                            duration: 0.8,
                            type: "spring"
                        }}
                        style={{
                            zIndex: 30,
                            width: isMobile ? '150px' : '200px' // Explicit width constraint
                        }}
                    >
                        <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 pointer-events-none">
                            <img src={src} alt="Memory" className="w-full h-full object-cover" />
                        </div>
                        <div className="h-4 md:h-8 pointer-events-none"></div> {/* Polaroid bottom space */}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slideshow;
