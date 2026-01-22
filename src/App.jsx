import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RomanticBackground from './components/love/RomanticBackground';
import InteractiveOverlay from './components/love/InteractiveOverlay';
import FloatingStickers from './components/love/FloatingStickers';
import BackgroundMusic from './components/love/BackgroundMusic';

import { letter } from './letter';

const Envelope = lazy(() => import('./components/love/Envelope'));
const Slideshow = lazy(() => import('./components/love/Slideshow'));

const App = () => {
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
    const [message, setMessage] = useState(letter);

    return (
        <div className="w-full h-screen overflow-hidden relative">
            <RomanticBackground />
            <FloatingStickers />
            <InteractiveOverlay />
            <BackgroundMusic />
            <AnimatePresence mode='wait'>
                {!isEnvelopeOpen ? (
                    <motion.div
                        key="envelope"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="w-full h-full"
                    >
                        <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
                            <Envelope
                                onOpen={() => setIsEnvelopeOpen(true)}
                                message={message}
                                setMessage={setMessage}
                            />
                        </Suspense>
                    </motion.div>
                ) : (
                    <motion.div
                        key="slideshow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full"
                    >
                        <Suspense fallback={<div className="text-white text-center mt-20">Loading memories...</div>}>
                            <Slideshow message={message} setMessage={setMessage} />
                        </Suspense>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


export default App;
