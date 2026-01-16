import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';
import { useEffect, useState } from 'react';

const Movie = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { getMovieById, addToWatchlist, removeFromWatchlist, watchlist, addToFavorites, removeFromFavorites, favorites } = useMovies();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await getMovieById(id);
            setMovie(data);
            setLoading(false);
        };
        load();
    }, [id, getMovieById]);

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin"></div></div>;
    if (!movie) return <div className="pt-32 text-center">Movie not found</div>;

    const canWatch = movie.isFree || (user?.plan === 'premium');
    const inWatchlist = watchlist.some(m => m.id === movie.id);
    const inFavorites = favorites.some(m => m.id === movie.id);

    const handleWatchlist = () => {
        if (inWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    const handleFavorites = () => {
        if (inFavorites) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    };

    const handleDownload = () => {
        setDownloading(true);
        // Mock download
        setTimeout(() => {
            setDownloading(false);
            alert("Download functionality is simulated. In a real app, this would save to local storage.");
        }, 2000);
    };

    return (
        <div className="min-h-full">
            {/* Video Player Section */}
            <div className="relative aspect-video w-full bg-black">
                {canWatch ? (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${movie.videos?.results?.[0]?.key}?autoplay=1&mute=0`}
                        title="Video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm bg-cover bg-center" style={{ backgroundImage: `url(${movie.backdrop_path})` }}>
                        <div className="absolute inset-0 bg-black/60"></div>
                        <div className="relative z-10 bg-black/80 backdrop-blur-md p-8 rounded-[2rem] text-center max-w-md border border-white/10 shadow-2xl">
                            <h2 className="text-3xl font-bold mb-4 text-white">Premium Content</h2>
                            <p className="text-gray-300 mb-8">
                                This item is reserved for our Premium members. Upgrade now to unlock.
                            </p>
                            <div className="flex flex-col gap-4">
                                <Link to="/pricing" className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all uppercase tracking-wider">
                                    Upgrade to Premium
                                </Link>
                                {!user && (
                                    <Link to="/login" className="text-gray-400 text-sm hover:text-white underline">
                                        Already a member? Sign In
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Movie Details */}
            <div className="px-8 py-8">
                <div className="grid md:grid-cols-[250px_1fr] gap-8">
                    <div>
                        <img src={movie.poster_path} alt={movie.title} className="w-full rounded-3xl shadow-2xl border border-white/10" />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold mb-4 text-white">{movie.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                            <span className="text-green-400 font-bold border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded">{movie.rating} Rating</span>
                            <span>{movie.release_date?.split('-')[0]}</span>
                            <span>{movie.genre}</span>
                            {movie.isFree ? (
                                <span className="border border-green-500 text-green-500 px-2 rounded text-xs py-0.5">FREE</span>
                            ) : (
                                <span className="bg-amber-500 text-black px-2 rounded text-xs py-0.5 font-bold">PREMIUM</span>
                            )}
                        </div>

                        <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl">
                            {movie.overview}
                        </p>

                        <div className="flex gap-4">
                            <button onClick={handleWatchlist} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition border ${inWatchlist ? 'bg-transparent border-white text-white hover:bg-white/10' : 'bg-white text-black border-transparent hover:bg-gray-200'}`}>
                                {inWatchlist ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.61-1.428 1.636-1.452zM12.9 8.16a.75.75 0 01.38.996L12.04 12l1.24 2.844a.75.75 0 11-1.36.6-.75.75 0 010-.002l-1.61-3.696a.75.75 0 010-.6l1.61-3.696a.75.75 0 01.98-.38z" clipRule="evenodd" />
                                        </svg>
                                        Remove List
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                                        </svg>
                                        My List
                                    </>
                                )}
                            </button>

                            <button onClick={handleFavorites} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition border ${inFavorites ? 'bg-red-500 border-red-500 text-white' : 'bg-white/10 text-white border-white/10 hover:bg-white/20'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={inFavorites ? "currentColor" : "none"} strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                                {inFavorites ? 'Favorited' : 'Favorite'}
                            </button>

                            {canWatch && (
                                <button onClick={handleDownload} disabled={downloading} className="flex items-center gap-2 bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition disabled:opacity-50">
                                    {downloading ? (
                                        <span className="animate-pulse">Downloading...</span>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                            Download
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;
