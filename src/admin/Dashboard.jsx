import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

// Subcomponents
import ManageMovies from './ManageMovies';
import Users from './Users';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        }
    }, [user, navigate]);

    const sidebarLinks = [
        { name: 'Dashboard', path: '/admin', icon: 'M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z' },
        { name: 'Movies', path: '/admin/movies', icon: 'M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' },
        { name: 'Users', path: '/admin/users', icon: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z' },
    ];

    const Overview = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Total Users', 'Total Movies', 'Active Subscriptions', 'Revenue'].map((label, idx) => (
                <div key={label} className="bg-[#181818] p-6 rounded-lg border border-gray-800">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">{label}</h3>
                    <p className="text-3xl font-bold text-white">{[1250, 48, 850, '$12,450'][idx]}</p>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-black pt-20 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#141414] border-r border-gray-800 hidden md:block fixed h-full">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-8">Admin Portal</h2>
                    <nav className="space-y-2">
                        {sidebarLinks.map((link) => {
                            const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${isActive ? 'bg-red-600/10 text-red-500' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                                    </svg>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 bg-black min-h-screen">
                <h1 className="text-2xl font-bold mb-8">
                    {location.pathname === '/admin' ? 'Dashboard Overview' : location.pathname.split('/').pop().charAt(0).toUpperCase() + location.pathname.split('/').pop().slice(1)}
                </h1>

                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/movies" element={<ManageMovies />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminDashboard;
