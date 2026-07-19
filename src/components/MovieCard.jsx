import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    // Route TV shows to /tv/:id, movies to /movie/:id
    const href = movie.mediaType === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`;

    return (
        <Link to={href} className="group block w-full relative">
            <div className="relative aspect-[3/4] rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden mb-2 xs:mb-3">
                <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Glass Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 xs:w-6 xs:h-6 ml-0.5">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-2 xs:top-3 right-2 xs:right-3 bg-black/40 backdrop-blur-md border border-white/10 px-1.5 xs:px-2 py-1 rounded-lg text-[8px] xs:text-[10px] font-bold text-yellow-400 flex items-center gap-1">
                    <span className="text-[8px] xs:text-[10px]">⭐</span>
                    <span className="text-[8px] xs:text-[10px]">{movie.rating}</span>
                </div>

                {/* TV Badge */}
                {movie.mediaType === 'tv' && (
                    <div className="absolute top-2 xs:top-3 left-2 xs:left-3 bg-purple-600/80 backdrop-blur-md border border-purple-400/30 px-1.5 py-0.5 rounded-lg text-[7px] xs:text-[9px] font-bold text-white">
                        TV
                    </div>
                )}
            </div>

            <h3 className="font-bold text-white text-xs xs:text-sm sm:text-base truncate pr-2 mb-1">{movie.title}</h3>
            <div className="flex items-center justify-between text-[10px] xs:text-xs text-gray-500 font-medium">
                <span className="truncate max-w-[60%]">{movie.genre}</span>
                <span className="flex-shrink-0">{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || '2023'}</span>
            </div>
        </Link>
    );
};

export default MovieCard;
