import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-green-900/40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-white">Payment Successful!</h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
                Welcome to Premium. Your account has been upgraded successfully.
            </p>

            <Link to="/" className="inline-block bg-white text-black font-bold px-8 py-3.5 rounded-xl hover:bg-gray-200 transition shadow-lg shadow-white/5">
                Start Streaming
            </Link>
        </div>
    );
};

export default Success;
