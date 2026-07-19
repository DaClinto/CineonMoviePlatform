import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const Genre = () => {
    const { id, name } = useParams();
    const { getMoviesByGenre } = useMovies();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGenre = async () => {
            setLoading(true);
            const data = await getMoviesByGenre(id);
            setMovies(data);
            setLoading(false);
        };

        if (id) fetchGenre();
    }, [id, getMoviesByGenre]);

    return (
        <div className="px-4 xs:px-6 sm:px-8 py-6 sm:py-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white capitalize">{name} Movies</h1>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 xs:gap-4 sm:gap-6">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Genre;
