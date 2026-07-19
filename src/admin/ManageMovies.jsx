import { useState } from 'react';
import { movies as initialMovies } from '../data/movies';

const ManageMovies = () => {
    const [movies, setMovies] = useState(initialMovies);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this movie?')) {
            setMovies(movies.filter(m => m.id !== id));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="bg-[#181818] border border-gray-700 text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-gray-500"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-2.5 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    Add New Movie
                </button>
            </div>

            <div className="bg-[#181818] rounded-lg border border-gray-800 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#222] text-gray-400 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Genre</th>
                            <th className="px-6 py-4">Rating</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {movies.map((movie) => (
                            <tr key={movie.id} className="hover:bg-[#252525]">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={movie.poster_path} alt="" className="w-10 h-14 object-cover rounded" />
                                    <span className="font-medium">{movie.title}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-300">{movie.genre}</td>
                                <td className="px-6 py-4 text-gray-300">{movie.rating}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${movie.isFree ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                        {movie.isFree ? 'FREE' : 'PREMIUM'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                                    <button
                                        onClick={() => handleDelete(movie.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Modal Placeholder */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#181818] p-8 rounded-lg max-w-md w-full border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4">Add Movie</h2>
                        <p className="text-gray-400 mb-6">This feature is simulated in this demo.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMovies;
