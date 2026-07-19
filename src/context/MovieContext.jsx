import { createContext, useState, useContext, useEffect } from 'react';
import { fetchFromTMDB, endpoints, getImageUrl } from '../services/tmdb';
import { useAuth } from './AuthContext';
import { db } from '../services/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, setDoc, getDoc } from 'firebase/firestore';

const MovieContext = createContext();

export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [trending, setTrending] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch Trending & Popular
                const trendingData = await fetchFromTMDB(endpoints.trending);
                const popularData = await fetchFromTMDB(endpoints.popular);
                const topRatedData = await fetchFromTMDB(endpoints.topRated);

                // Normalize data to match our app's expected format (if needed, but TMDB format is standard)
                // We'll add some "isFree" logic randomly for demo purposes since TMDB doesn't have that.
                const processMovies = (results) => results.map(m => ({
                    ...m,
                    poster_path: getImageUrl(m.poster_path, 'w500'),
                    backdrop_path: getImageUrl(m.backdrop_path, 'original'),
                    rating: m.vote_average.toFixed(1),
                    // Randomly assign free/premium for the demo
                    isFree: m.vote_average < 7.5,
                    genre: "Movie" // Simplified unless we map genre_ids
                }));

                const allMovies = [
                    ...(trendingData?.results ? processMovies(trendingData.results) : []),
                    ...(popularData?.results ? processMovies(popularData.results) : []),
                    ...(topRatedData?.results ? processMovies(topRatedData.results) : []),
                ];

                // Unique by ID
                const uniqueMovies = Array.from(new Map(allMovies.map(item => [item.id, item])).values());

                setMovies(uniqueMovies);
                setTrending(processMovies(trendingData?.results || []));

            } catch (err) {
                console.error("Failed to load movies", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Load/Sync Watchlist
    useEffect(() => {
        if (user) {
            // Firestore Sync
            const userRef = doc(db, 'users', user.id);
            const unsubscribe = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    setWatchlist(docSnap.data().watchlist || []);
                    setFavorites(docSnap.data().favorites || []);
                }
            });
            return () => unsubscribe();
        } else {
            // LocalStorage Fallback
            const savedWatchlist = JSON.parse(localStorage.getItem('cineon_watchlist') || '[]');
            setWatchlist(savedWatchlist);
            const savedFavorites = JSON.parse(localStorage.getItem('cineon_favorites') || '[]');
            setFavorites(savedFavorites);

            // Note: We don't automatically sync localStorage to Firestore on login here 
            // for simplicity, but that would be a good future "Real Life" feature.
        }
    }, [user]);

    // Update LocalStorage when watchlist changes (ONLY if not logged in)
    useEffect(() => {
        if (!user) {
            localStorage.setItem('cineon_watchlist', JSON.stringify(watchlist));
        }
    }, [watchlist, user]);

    // Update LocalStorage for Favorites (ONLY if not logged in)
    useEffect(() => {
        if (!user) {
            localStorage.setItem('cineon_favorites', JSON.stringify(favorites));
        }
    }, [favorites, user]);

    const addToWatchlist = async (movie) => {
        if (user) {
            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, {
                watchlist: arrayUnion(movie)
            });
        } else {
            setWatchlist(prev => {
                if (prev.some(m => m.id === movie.id)) return prev;
                return [...prev, movie];
            });
        }
    };

    const removeFromWatchlist = async (movieId) => {
        if (user) {
            const movieToRemove = watchlist.find(m => m.id === movieId);
            if (movieToRemove) {
                const userRef = doc(db, 'users', user.id);
                try {
                    await updateDoc(userRef, {
                        watchlist: arrayRemove(movieToRemove)
                    });
                } catch (e) { console.error("Error removing from watchlist", e); }
            }
        } else {
            setWatchlist(prev => prev.filter(m => m.id !== movieId));
        }
    };

    const addToFavorites = async (movie) => {
        if (user) {
            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, {
                favorites: arrayUnion(movie)
            });
        } else {
            setFavorites(prev => {
                if (prev.some(m => m.id === movie.id)) return prev;
                return [...prev, movie];
            });
        }
    };

    const removeFromFavorites = async (movieId) => {
        if (user) {
            const movieToRemove = favorites.find(m => m.id === movieId);
            if (movieToRemove) {
                const userRef = doc(db, 'users', user.id);
                try {
                    await updateDoc(userRef, {
                        favorites: arrayRemove(movieToRemove)
                    });
                } catch (e) { console.error("Error removing from favorites", e); }
            }
        } else {
            setFavorites(prev => prev.filter(m => m.id !== movieId));
        }
    };

    const getMovieById = async (id) => {
        // First check state
        const existing = movies.find(m => m.id.toString() === id.toString());
        if (existing) return existing;

        // If not found (refreshed page on a movie detail), fetch it individually
        const data = await fetchFromTMDB(endpoints.movieDetails(id));
        if (data) {
            return {
                ...data,
                poster_path: getImageUrl(data.poster_path, 'w500'),
                backdrop_path: getImageUrl(data.backdrop_path, 'original'),
                rating: data.vote_average.toFixed(1),
                isFree: data.vote_average < 7.5,
                genre: data.genres?.[0]?.name || "Movie"
            };
        }
        return null;
    };

    const searchMovies = async (query) => {
        const data = await fetchFromTMDB(endpoints.search(query));
        if (data?.results) {
            return data.results.map(m => ({
                ...m,
                poster_path: getImageUrl(m.poster_path, 'w500'),
                backdrop_path: getImageUrl(m.backdrop_path, 'original'),
                rating: m.vote_average.toFixed(1),
                isFree: m.vote_average < 7.5,
            }));
        }
        return [];
    };

    const getMoviesByGenre = async (genreId) => {
        const data = await fetchFromTMDB(endpoints.byGenre(genreId));
        if (data?.results) {
            return data.results.map(m => ({
                ...m,
                poster_path: getImageUrl(m.poster_path, 'w500'),
                backdrop_path: getImageUrl(m.backdrop_path, 'original'),
                rating: m.vote_average.toFixed(1),
                isFree: m.vote_average < 7.5,
            }));
        }
        return [];
    };

    const value = {
        movies,
        trending,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        getMovieById,
        searchMovies,
        getMoviesByGenre,
        favorites,
        addToFavorites,
        removeFromFavorites,
        loading
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
