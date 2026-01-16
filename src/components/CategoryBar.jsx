import { useNavigate } from 'react-router-dom';

// TMDB Genre IDs
const categories = [
    { id: 28, name: 'Action', icon: '⚔️' },
    { id: 12, name: 'Adventure', icon: '🗺️' },
    { id: 16, name: 'Animation', icon: '🧸', active: true },
    { id: 35, name: 'Comedy', icon: '😂' },
    { id: 80, name: 'Crime', icon: '🚓' },
    { id: 18, name: 'Drama', icon: '🎭' },
    { id: 14, name: 'Fantasy', icon: '🧙' },
    { id: 27, name: 'Horror', icon: '👻' },
    { id: 10749, name: 'Romance', icon: '❤️' },
    { id: 878, name: 'Sci-Fi', icon: '👽' },
];

const CategoryBar = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-wrap gap-4 pb-4 justify-center">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => navigate(`/genre/${cat.id}/${cat.name}`)}
                    className={`
            flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300
            ${cat.active
                            ? 'bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                            : 'bg-white/5 border border-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/10'
                        }
          `}
                >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="font-medium text-sm">{cat.name}</span>
                </button>
            ))}
        </div>
    );
};

export default CategoryBar;
