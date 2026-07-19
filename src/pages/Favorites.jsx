import { Link } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
    const { favorites } = useMovies();

    if (favorites.length === 0) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2 text-white">No Favorites Yet</h1>
                <p className="text-gray-400 mb-8 max-w-sm">Mark movies as favorites to save them here.</p>
                <Link to="/" className="bg-[#1e2028] border border-white/10 px-6 py-3 rounded-full font-medium hover:bg-white/10 transition">
                    Browse Movies
                </Link>
            </div>
        );
    }

    return (
        <div className="px-8 pb-10">
            <h1 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                <span className="text-red-500">My</span> Favorites
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {favorites.map(movie => (
                    <MovieCard key={`fav-${movie.id}`} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
