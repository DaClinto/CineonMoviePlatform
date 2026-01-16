import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { upgradeToPremium } = useAuth();

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Real Life Logic: Update Firestore
            await upgradeToPremium();
            setLoading(false);
            navigate('/success');
        } catch (error) {
            console.error("Payment failed", error);
            setLoading(false);
            alert("Payment failed: " + error.message);
        }
    };


    return (
        <div className="px-4 py-8 flex justify-center">
            <div className="w-full max-w-lg bg-black/20 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem]">
                <h1 className="text-2xl font-bold mb-8 text-white">Checkout</h1>

                <div className="mb-8 pb-6 border-b border-white/10">
                    <div className="flex justify-between items-center text-gray-300 mb-2">
                        <span>Premium Plan</span>
                        <span className="text-white font-bold">$12.99</span>
                    </div>
                    <div className="text-xs text-gray-500">Billed monthly • Cancel anytime</div>
                </div>

                <form onSubmit={handlePayment} className="space-y-5">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Card Settings</label>
                        <div className="flex gap-3 mb-4">
                            {['visa', 'mastercard', 'amex'].map(card => (
                                <div key={card} className="h-10 w-16 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center text-xs text-gray-500 capitalize">{card}</div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Name on Card</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:bg-white/10 glass-input" placeholder="John Doe" required />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Card Number</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:bg-white/10 glass-input" placeholder="0000 0000 0000 0000" maxLength="19" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Expiry</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:bg-white/10 glass-input" placeholder="MM/YY" maxLength="5" required />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">CVC</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:bg-white/10 glass-input" placeholder="123" maxLength="3" required />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl mt-4 hover:shadow-lg hover:shadow-blue-900/40 transition flex justify-center items-center"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            'Confirm Payment ($12.99)'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
