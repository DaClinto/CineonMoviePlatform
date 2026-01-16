import { Link } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
    const { watchlist } = useMovies();

    if (watchlist.length === 0) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2 text-white">Your list is empty</h1>
                <p className="text-gray-400 mb-8 max-w-sm">Movies you add to your watchlist will appear here.</p>
                <Link to="/" className="bg-[#1e2028] border border-white/10 px-6 py-3 rounded-full font-medium hover:bg-white/10 transition">
                    Browse Movies
                </Link>
            </div>
        );
    }

    return (
        <div className="px-8 pb-10">
            <h1 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                <span className="text-blue-400">My</span> Watchlist
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {watchlist.map(movie => (
                    <MovieCard key={`watchlist-${movie.id}`} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Watchlist;
