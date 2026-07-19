import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';
import { useEffect, useState, useCallback } from 'react';
import { fetchFromTMDB, endpoints } from '../services/tmdb';
import { EMBED_PROVIDERS, DEFAULT_PROVIDER_ID, getProvider } from '../services/embedProviders';

const TVDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { addToWatchlist, removeFromWatchlist, watchlist, addToFavorites, removeFromFavorites, favorites } = useMovies();

    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [selectedEpisode, setSelectedEpisode] = useState(1);
    const [seasonData, setSeasonData] = useState(null);
    const [seasonLoading, setSeasonLoading] = useState(false);
    const [playerKey, setPlayerKey] = useState(0);
    const [providerId, setProviderId] = useState(DEFAULT_PROVIDER_ID);

    // Fetch show details
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await fetchFromTMDB(endpoints.tvDetails(id));
            if (data) {
                setShow(data);
                // Default to season 1
                setSelectedSeason(1);
            }
            setLoading(false);
        };
        load();
    }, [id]);

    // Fetch season episodes when season changes
    useEffect(() => {
        if (!id || !selectedSeason) return;
        const loadSeason = async () => {
            setSeasonLoading(true);
            const data = await fetchFromTMDB(endpoints.tvSeason(id, selectedSeason));
            setSeasonData(data);
            setSelectedEpisode(1);
            setSeasonLoading(false);
        };
        loadSeason();
    }, [id, selectedSeason]);

    const handlePlay = useCallback((ep) => {
        setSelectedEpisode(ep);
        setPlayerKey(k => k + 1);
    }, []);

    const switchProvider = (newId) => {
        setProviderId(newId);
        setPlayerKey(k => k + 1);
    };

    if (loading) return (
        <div className="h-[60vh] flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
        </div>
    );
    if (!show) return <div className="pt-32 text-center text-white">Show not found</div>;

    const canWatch = (show.vote_average < 7.5) || (user?.plan === 'premium');
    const tvMovie = {
        id: show.id,
        title: show.name,
        poster_path: show.poster_path
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : null,
        backdrop_path: show.backdrop_path
            ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
            : null,
        rating: show.vote_average?.toFixed(1),
        genre: 'TV Series',
        isFree: show.vote_average < 7.5,
        mediaType: 'tv',
    };

    const inWatchlist = watchlist.some(m => m.id === show.id);
    const inFavorites = favorites.some(m => m.id === show.id);

    const currentProvider = getProvider(providerId);
    const embedUrl = currentProvider.tv(show.id, selectedSeason, selectedEpisode);
    const seasons = show.seasons?.filter(s => s.season_number > 0) || [];

    return (
        <div className="min-h-full">
            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
                {canWatch ? (
                    <iframe
                        key={playerKey}
                        className="w-full h-full"
                        src={embedUrl}
                        title={`${show.name} S${selectedSeason}E${selectedEpisode}`}
                        frameBorder="0"
                        referrerPolicy="origin"
                        allowFullScreen
                        allow="autoplay; fullscreen; picture-in-picture"
                    ></iframe>
                ) : (
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center bg-cover bg-center"
                        style={{ backgroundImage: `url(${tvMovie.backdrop_path})` }}
                    >
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                        <div className="relative z-10 bg-black/80 backdrop-blur-md p-8 rounded-[2rem] text-center max-w-md border border-white/10 shadow-2xl">
                            <h2 className="text-3xl font-bold mb-4 text-white">Premium Content</h2>
                            <p className="text-gray-300 mb-8">
                                This series is reserved for Premium members. Upgrade now to unlock all episodes.
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

            {/* Source Switcher */}
            {canWatch && (
                <div className="bg-black/40 border-b border-white/10 px-6 py-2.5 flex items-center gap-3 flex-wrap">
                    <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">Source:</span>
                    {EMBED_PROVIDERS.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => switchProvider(p.id)}
                            className={`text-xs px-3 py-1 rounded-full font-semibold transition-all border ${
                                providerId === p.id
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/15 hover:text-white'
                            }`}
                        >
                            {p.label}
                        </button>
                    ))}
                    <span className="ml-auto text-white/25 text-xs italic">If one source fails, try another</span>
                </div>
            )}

            {/* Now Playing Banner */}
            {canWatch && (
                <div className="bg-white/5 border-b border-white/10 px-8 py-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-white/80 text-sm font-medium">
                        Now Playing — <span className="text-white font-bold">{show.name}</span>
                        <span className="text-white/50 ml-2">Season {selectedSeason}, Episode {selectedEpisode}</span>
                        {seasonData?.episodes?.[selectedEpisode - 1]?.name && (
                            <span className="text-purple-400 ml-2">"{seasonData.episodes[selectedEpisode - 1].name}"</span>
                        )}
                    </span>
                </div>
            )}

            {/* Show Details */}
            <div className="px-8 py-8">
                <div className="grid md:grid-cols-[250px_1fr] gap-8 mb-10">
                    <div>
                        <img
                            src={tvMovie.poster_path}
                            alt={show.name}
                            className="w-full rounded-3xl shadow-2xl border border-white/10"
                        />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-white">{show.name}</h1>
                        {show.tagline && (
                            <p className="text-purple-400 italic mb-4 text-lg">"{show.tagline}"</p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-6">
                            <span className="text-green-400 font-bold border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded">
                                ⭐ {tvMovie.rating}
                            </span>
                            <span>{show.first_air_date?.split('-')[0]}</span>
                            <span className="border border-white/20 px-2 py-0.5 rounded">TV Series</span>
                            <span>{show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}</span>
                            <span>{show.number_of_episodes} Episodes</span>
                            {show.status && (
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${show.status === 'Ended' ? 'bg-gray-600 text-white' : 'bg-green-600 text-white'}`}>
                                    {show.status}
                                </span>
                            )}
                        </div>

                        <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl">
                            {show.overview}
                        </p>

                        {/* Genres */}
                        {show.genres?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {show.genres.map(g => (
                                    <span key={g.id} className="text-xs px-3 py-1 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300">
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => inWatchlist ? removeFromWatchlist(show.id) : addToWatchlist(tvMovie)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition border ${inWatchlist ? 'bg-transparent border-white text-white hover:bg-white/10' : 'bg-white text-black border-transparent hover:bg-gray-200'}`}
                            >
                                {inWatchlist ? '✓ In My List' : '+ My List'}
                            </button>
                            <button
                                onClick={() => inFavorites ? removeFromFavorites(show.id) : addToFavorites(tvMovie)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition border ${inFavorites ? 'bg-red-500 border-red-500 text-white' : 'bg-white/10 text-white border-white/10 hover:bg-white/20'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={inFavorites ? 'currentColor' : 'none'} strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                                {inFavorites ? 'Favorited' : 'Favorite'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Season & Episode Selector */}
                <div className="mt-4">
                    <div className="flex flex-col gap-6">
                        {/* Season Tabs */}
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">Seasons</h2>
                            <div className="flex flex-wrap gap-2">
                                {seasons.map(s => (
                                    <button
                                        key={s.season_number}
                                        onClick={() => setSelectedSeason(s.season_number)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                            selectedSeason === s.season_number
                                                ? 'bg-white text-black shadow-lg scale-105'
                                                : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/10'
                                        }`}
                                    >
                                        Season {s.season_number}
                                        {s.episode_count && (
                                            <span className="ml-1.5 text-xs opacity-60">({s.episode_count} eps)</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Episodes List */}
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">
                                Episodes
                                {seasonLoading && <span className="ml-3 text-sm font-normal text-white/40 animate-pulse">Loading...</span>}
                            </h2>
                            {seasonData?.episodes && !seasonLoading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {seasonData.episodes.map(ep => (
                                        <button
                                            key={ep.episode_number}
                                            onClick={() => handlePlay(ep.episode_number)}
                                            className={`group flex items-start gap-3 p-4 rounded-2xl text-left transition-all border ${
                                                selectedEpisode === ep.episode_number
                                                    ? 'bg-white/15 border-white/30 shadow-lg'
                                                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
                                            }`}
                                        >
                                            {/* Episode Thumbnail */}
                                            <div className="flex-shrink-0 relative w-20 aspect-video rounded-lg overflow-hidden bg-white/10">
                                                {ep.still_path ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                                                        alt={ep.name}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                                            <path d="M8 5v14l11-7z"/>
                                                        </svg>
                                                    </div>
                                                )}
                                                {selectedEpisode === ep.episode_number && (
                                                    <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                                                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" className="w-3 h-3 ml-0.5">
                                                                <path d="M8 5v14l11-7z"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Episode Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs text-white/40 font-mono">E{ep.episode_number}</span>
                                                    {ep.runtime && (
                                                        <span className="text-xs text-white/30">{ep.runtime}m</span>
                                                    )}
                                                </div>
                                                <p className="text-sm font-semibold text-white truncate">{ep.name}</p>
                                                {ep.overview && (
                                                    <p className="text-xs text-white/50 mt-1 line-clamp-2">{ep.overview}</p>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                !seasonLoading && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => handlePlay(i + 1)}
                                                className={`flex items-center gap-3 p-4 rounded-2xl text-left transition-all border ${
                                                    selectedEpisode === i + 1
                                                        ? 'bg-white/15 border-white/30'
                                                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                                                }`}
                                            >
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/60 font-bold flex-shrink-0">
                                                    {i + 1}
                                                </div>
                                                <span className="text-sm font-medium text-white">Episode {i + 1}</span>
                                            </button>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TVDetail;
