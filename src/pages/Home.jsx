import { useMovies } from '../context/MovieContext';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import CategoryBar from '../components/CategoryBar';

import { useState } from 'react';

const Home = () => {
    const { movies, trending, loading } = useMovies();
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

    // Loading Skeleton
    if (loading) {
        return (
            <div className="px-8 pb-10 flex flex-col gap-10 mt-10">
                <div className="w-full h-[400px] bg-white/5 rounded-[2rem] animate-pulse"></div>
                <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-32 h-12 bg-white/5 rounded-2xl animate-pulse"></div>)}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 bg-white/5 rounded-3xl animate-pulse"></div>)}
                </div>
            </div>
        );
    }

    // Use real data
    const heroMovie1 = trending[0];
    const heroMovie2 = trending[1];

    // Use "Popular" for the grid
    const displayMovies = movies.slice(0, 42); // Show first 44 movies

    return (
        <div className="px-8 pb-10">
            <Hero movie={heroMovie1} secondaryMovie={heroMovie2} />

            <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Browse by Category</h2>
                <CategoryBar />
            </div>

            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-normal text-white">
                        Trending <span className="font-bold">Now</span>
                    </h2>

                    <div className="bg-[#1e2028] rounded-full p-1 flex gap-1 border border-white/10">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition ${viewMode === 'list' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6" : "flex flex-col gap-4"}>
                    {displayMovies.map(movie => (
                        <div key={movie.id} className={viewMode === 'list' ? "flex gap-4 items-center bg-white/5 p-4 rounded-2xl" : ""}>
                            {viewMode === 'list' ? (
                                <>
                                    <img src={movie.poster_path} alt={movie.title} className="w-24 h-36 object-cover rounded-xl" />
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                                        <p className="text-gray-400 md:line-clamp-2 hidden">{movie.overview}</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-yellow-500 font-bold">{movie.rating} ⭐</span>
                                            <span className="text-gray-500">{movie.release_date?.split('-')[0]}</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <MovieCard movie={movie} />
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
