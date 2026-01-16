import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMovies } from '../context/MovieContext';
import { useTheme } from '../context/ThemeContext';
import { SwatchIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { searchMovies } = useMovies();
    const { theme, setThemeColor, themes } = useTheme();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Movie');
    const [searchOpen, setSearchOpen] = useState(false);
    const [themeOpen, setThemeOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        navigate(`/search?q=${query}`);
        setSearchOpen(false);
    };

    const onSearchChange = async (e) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 2) {
            const results = await searchMovies(val);
            setSearchResults(results.slice(0, 5));
        } else {
            setSearchResults([]);
        }
    };

    return (
        <nav className="px-8 py-6 relative z-50 shrink-0 m-[15px] mb-[-5px] grid grid-cols-1 md:grid-cols-3 items-center">
            {/* 1. Logo Section */}
            {/* 1. Logo Section */}
            <Link to="/" className="hover:opacity-80 transition flex items-center gap-2">
                <span className="text-3xl font-bold text-white">CINEON</span>
            </Link>

            {/* 2. Center Pill Navigation (Search & Filters) */}
            <div className="flex justify-center w-full">
                <div className="bg-black/40 backdrop-blur-md rounded-full p-1.5 flex items-center gap-1 border border-white/10 relative">
                    {['Movie', 'Series', 'Originals'].map((tab) => (
                        <Link
                            key={tab}
                            to={tab === 'Movie' ? '/' : `/${tab.toLowerCase()}`}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hidden md:block ${activeTab === tab
                                ? 'bg-[#1e2028] text-white shadow-lg'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {tab}
                        </Link>
                    ))}

                    <div className="w-px h-6 bg-white/10 mx-1 hidden md:block"></div>

                    {/* Search Input Container */}
                    <div className="relative group">
                        <form onSubmit={handleSearch} className="flex items-center">
                            <input
                                type="text"
                                placeholder="Put any keywords..."
                                className={`bg-transparent border-none focus:ring-0 text-white text-sm transition-all duration-300 ${searchOpen ? 'w-48 px-3' : 'w-0 px-0'}`}
                                value={query}
                                onChange={onSearchChange}
                                onBlur={() => setTimeout(() => !query && setSearchOpen(false), 200)}
                            />
                            <button
                                type="button"
                                onClick={() => !query && setSearchOpen(!searchOpen)}
                                className="p-2 text-white hover:bg-white/10 rounded-full transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </form>

                        {/* Quick Search Dropdown */}
                        {searchResults.length > 0 && searchOpen && (
                            <div className="absolute top-full right-0 mt-4 w-64 bg-[#1e2028] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                                {searchResults.map(movie => (
                                    <Link
                                        to={`/movie/${movie.id}`}
                                        key={movie.id}
                                        onClick={() => { setSearchOpen(false); setQuery(''); }}
                                        className="flex items-center gap-3 p-3 hover:bg-white/5 transition border-b border-white/5 last:border-0"
                                    >
                                        <img src={movie.poster_path} className="w-8 h-12 object-cover rounded" alt="" />
                                        <div className="text-sm overflow-hidden">
                                            <div className="truncate font-medium text-white">{movie.title}</div>
                                            <div className="text-xs text-gray-400">{movie.rating} ⭐</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. Right Profile Section */}
            {/* 3. Right Profile Section */}
            <div className="flex items-center gap-4 justify-end">
                {user ? (
                    <div className="flex items-center gap-3">
                        {/* Theme Picker */}
                        <div className="relative">
                            <button
                                onClick={() => setThemeOpen(!themeOpen)}
                                className="p-2 text-gray-400 hover:text-white transition"
                                title="Change Theme"
                            >
                                <SwatchIcon className="w-6 h-6" />
                            </button>

                            {themeOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-[#1e2028] border border-white/10 rounded-xl shadow-xl p-3 grid grid-cols-5 gap-2 z-50">
                                    {Object.entries(themes).map(([key, t]) => (
                                        <button
                                            key={key}
                                            onClick={() => { setThemeColor(key); setThemeOpen(false); }}
                                            className={`w-6 h-6 rounded-full border-2 transition ${theme === key ? 'border-white scale-110' : 'border-transparent hover:scale-110'}`}
                                            style={{ backgroundColor: t.color }}
                                            title={t.name}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link to="/notifications" className="relative p-2 text-gray-300 hover:text-white transition group">
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#1e2028] animate-pulse"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </Link>

                        <div
                            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-1 pr-4 py-1 cursor-pointer hover:bg-white/10 transition relative"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <div className="text-left hidden lg:block">
                                <div className="text-xs font-bold">{user.name}</div>
                                <div className="text-[10px] text-gray-400 capitalize">{user.plan || 'Free'} Member</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-[#1e2028] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                                    <Link to="/watchlist" className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white">Watchlist (Watch Later)</Link>
                                    <Link to="/favorites" className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white">Favorites</Link>
                                    <Link to="/pricing" className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white">Plans</Link>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin" className="block px-4 py-3 text-sm text-yellow-500 hover:bg-white/5">Admin Dashboard</Link>
                                    )}
                                    <div className="border-t border-white/10 my-1"></div>
                                    <button onClick={logout} className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5">Sign Out</button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setThemeOpen(!themeOpen)}
                                className="p-2 text-gray-400 hover:text-white transition"
                            >
                                <SwatchIcon className="w-6 h-6" />
                            </button>
                            {themeOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-[#1e2028] border border-white/10 rounded-xl shadow-xl p-3 grid grid-cols-5 gap-2 z-50">
                                    {Object.entries(themes).map(([key, t]) => (
                                        <button
                                            key={key}
                                            onClick={() => { setThemeColor(key); setThemeOpen(false); }}
                                            className={`w-6 h-6 rounded-full border-2 transition ${theme === key ? 'border-white scale-110' : 'border-transparent hover:scale-110'}`}
                                            style={{ backgroundColor: t.color }}
                                            title={t.name}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <Link to="/login" className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition">
                            Sign In
                        </Link>
                    </div>
                )}
            </div>


            {/* Notification Modal / Popover can go here if we want a full UI, using simple absolute for now if requested */}
        </nav >
    );
};

export default Navbar;
