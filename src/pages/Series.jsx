import { useState, useEffect } from 'react';
import { fetchFromTMDB, getImageUrl, endpoints } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

const Series = () => {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSeries = async () => {
            const data = await fetchFromTMDB(endpoints.series);
            if (data?.results) {
                setSeries(data.results.map(m => ({
                    ...m,
                    title: m.name, // TV shows use 'name' not 'title'
                    poster_path: getImageUrl(m.poster_path, 'w500'),
                    backdrop_path: getImageUrl(m.backdrop_path, 'original'),
                    rating: m.vote_average.toFixed(1),
                    genre: "TV Series"
                })));
            }
            setLoading(false);
        };
        loadSeries();
    }, []);

    if (loading) return <div className="text-white text-center mt-20">Loading Series...</div>;

    return (
        <div className="px-8 pb-10">
            <h1 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                <span className="text-purple-400">Popular</span> Series
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {series.map(show => (
                    <MovieCard key={show.id} movie={show} />
                ))}
            </div>
        </div>
    );
};

export default Series;
