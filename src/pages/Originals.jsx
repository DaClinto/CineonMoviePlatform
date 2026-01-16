import { useState, useEffect } from 'react';
import { fetchFromTMDB, getImageUrl, endpoints } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

const Originals = () => {
    const [originals, setOriginals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOriginals = async () => {
            const data = await fetchFromTMDB(endpoints.originals);
            if (data?.results) {
                setOriginals(data.results.map(m => ({
                    ...m,
                    title: m.name, // Originals are often TV shows
                    poster_path: getImageUrl(m.poster_path, 'w500'),
                    backdrop_path: getImageUrl(m.backdrop_path, 'original'),
                    rating: m.vote_average.toFixed(1),
                    genre: "Original"
                })));
            }
            setLoading(false);
        };
        loadOriginals();
    }, []);

    if (loading) return <div className="text-white text-center mt-20">Loading Originals...</div>;

    return (
        <div className="px-8 pb-10">
            <h1 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                <span className="text-red-600">Cinéon</span> Originals
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {originals.map(show => (
                    <MovieCard key={show.id} movie={show} />
                ))}
            </div>
        </div>
    );
};

export default Originals;
