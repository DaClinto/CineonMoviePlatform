import { Link } from 'react-router-dom';
import heroVideo from '../assets/hero_trailer.mp4';

import { useState } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

const Hero = ({ movie, secondaryMovie }) => {
    const [isMuted, setIsMuted] = useState(true);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

            {/* Primary Hero Card */}
            <div className="relative h-[300px] md:h-[380px] rounded-[2rem] overflow-hidden group border border-white/5 shadow-2xl">
                <img
                    src={movie?.backdrop_path}
                    alt={movie?.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f2c]/90 via-[#1a1f2c]/40 to-transparent"></div>

                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center items-start">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight max-w-sm">
                        {movie?.title}
                    </h1>
                    <p className="text-gray-300 mb-8 line-clamp-2 max-w-md text-sm md:text-base opacity-80">
                        {movie?.description}
                    </p>

                    <Link
                        to={`/movie/${movie?.id}`}
                        className="flex items-center gap-3 bg-[#1e2028] text-white px-6 py-3 rounded-xl font-medium hover:bg-black/80 transition-all border border-white/10"
                    >
                        <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        Let Play Movie
                    </Link>
                </div>
            </div>

            {/* Secondary Hero Card */}
            {secondaryMovie && (
                <div className="relative h-[300px] md:h-[380px] rounded-[2rem] overflow-hidden group border border-white/5 shadow-2xl hidden lg:block">
                    <video
                        src={heroVideo}
                        poster={secondaryMovie.backdrop_path}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-transparent to-transparent mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition z-20"
                    >
                        {isMuted ? <SpeakerXMarkIcon className="w-5 h-5" /> : <SpeakerWaveIcon className="w-5 h-5" />}
                    </button>

                    <div className="absolute bottom-0 left-0 p-10 w-full">
                        <h2 className="text-3xl font-bold text-white mb-2 max-w-xs leading-tight">
                            Recalling the journey of exciting story
                        </h2>
                        <Link
                            to={`/movie/${secondaryMovie.id}`}
                            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold hover:text-gray-300 transition"
                        >
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            Let Play Movie
                        </Link>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Hero;
