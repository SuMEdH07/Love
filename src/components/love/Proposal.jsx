import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import heartAnimation from '../../assets/love/heart.json';

const Proposal = ({ onYes }) => {
    const [message, setMessage] = useState("");

    const handleYesClick = () => {
        setMessage("You cannot I love you more than anyone, No Need To Prove That ❤️");
        setTimeout(() => {
            onYes();
        }, 2000);
    };

    const handleNoClick = () => {
        setMessage("Good Girl Babe 😘");
        setTimeout(() => {
            onYes();
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-40 h-40 md:w-80 md:h-80 drop-shadow-2xl">
                <Lottie animationData={heartAnimation} loop={true} />
            </div>
            <div className="w-32 h-32 md:w-60 md:h-60 -mt-10 md:-mt-16 mb-4 animate-wobble z-50 relative">
                <img
                    src="dairy_milk_v2.png"
                    alt="Dairy Milk"
                    className="w-full h-full object-contain drop-shadow-2xl filter brightness-110 blend-image"
                    onError={(e) => {
                        console.error("Image failed to load:", e);
                        e.target.style.display = 'none';
                    }}
                />
            </div>
            <p className="font-handwriting text-pink-500 text-xl font-bold mt-[-10px] drop-shadow-md">You like someone else?</p>

            {!message ? (
                <div className="flex gap-4 mt-4 z-50">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleYesClick}
                        className="px-8 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transform transition-all"
                    >
                        Yes
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNoClick}
                        className="px-8 py-2 bg-white text-pink-500 border-2 border-pink-200 rounded-full font-bold shadow-md hover:bg-pink-50 transform transition-all"
                    >
                        No
                    </motion.button>
                </div>
            ) : (
                <motion.p
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 text-xl font-handwriting text-rose-600 font-bold text-center drop-shadow-sm max-w-xs"
                >
                    {message}
                </motion.p>
            )}
        </div>
    );
};

export default Proposal;
