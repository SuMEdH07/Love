import React from 'react';
import Lottie from 'lottie-react';
import heartAnimation from '../../assets/love/heart.json';

const CoupleKissing = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl">
                <Lottie animationData={heartAnimation} loop={true} />
            </div>
            {/* <p className="text-xs text-red-300 mt-2">Replace src/assets/love/heart.json with your file</p> */}
        </div>
    );
};

export default CoupleKissing;
