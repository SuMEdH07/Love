import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveOverlay = () => {
    const [trail, setTrail] = useState([]);
    const [bursts, setBursts] = useState([]);
    const requestRef = useRef();

    // Mouse Trail Logic
    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        let lastUpdate = 0;
        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastUpdate < 100) return; // Throttle to 100ms
            lastUpdate = now;

            const newParticle = {
                id: Date.now() + Math.random(),
                x: e.clientX,
                y: e.clientY,
            };

            setTrail((prev) => [...prev.slice(-10), newParticle]); // Keep last 10 (reduced from 15)
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Click Burst Logic
    useEffect(() => {
        const handleClick = (e) => {
            const newBurst = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                particles: [...Array(10)].map((_, i) => ({
                    id: i,
                    angle: (i / 10) * 360,
                    distance: 50 + Math.random() * 50
                }))
            };
            setBursts((prev) => [...prev, newBurst]);

            // Cleanup burst after animation
            setTimeout(() => {
                setBursts((prev) => prev.filter(b => b.id !== newBurst.id));
            }, 1000);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Mouse Trail */}
            <AnimatePresence>
                {trail.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 0, y: 20 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute text-red-500 text-xl"
                        style={{ left: particle.x, top: particle.y }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Click Bursts */}
            <AnimatePresence>
                {bursts.map((burst) => (
                    <div key={burst.id} className="absolute" style={{ left: burst.x, top: burst.y }}>
                        {burst.particles.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                animate={{
                                    x: Math.cos(p.angle * Math.PI / 180) * p.distance,
                                    y: Math.sin(p.angle * Math.PI / 180) * p.distance,
                                    opacity: 0,
                                    scale: 0.5
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute text-2xl"
                            >
                                {['💖', '✨', '🌸', '💋'][Math.floor(Math.random() * 4)]}
                            </motion.div>
                        ))}
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveOverlay;
