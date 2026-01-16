import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            if (email.includes('admin')) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Login failed", error);
            alert(error.message);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
                <h1 className="text-3xl font-bold mb-2 text-white text-center">Welcome Back</h1>
                <p className="text-gray-400 text-center mb-8 text-sm">Enter your credentials to access your account</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full bg-black/20 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:bg-black/40 focus:border-white/20 transition-all placeholder:text-gray-600"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-black/20 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:bg-black/40 focus:border-white/20 transition-all placeholder:text-gray-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-white text-black font-bold py-3.5 rounded-xl mt-2 hover:bg-gray-200 transition shadow-lg shadow-white/5">
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center text-xs text-gray-500">
                    <p className="mb-2">Admin Demo: admin@cineon.com</p>
                    <p>User Demo: user@cineon.com</p>

                </div>
            </div>
        </div>
    );
};

export default Login;
