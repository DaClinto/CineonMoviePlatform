import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Pricing = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const plans = [
        {
            name: 'Free',
            price: '$0',
            features: ['Stream Free Movies', 'SD Quality', 'Ads Included', 'No Downloads'],
            isPopular: false,
            role: 'free'
        },
        {
            name: 'Premium',
            price: '$12.99',
            features: ['Stream Everything', '4K HDR Quality', 'Ad-Free Experience', 'Unlimited Downloads'],
            isPopular: true,
            role: 'premium'
        }
    ];

    const handleSelectPlan = (planRole) => {
        if (!user) { navigate('/login'); return; }
        if (planRole === 'premium') navigate('/checkout');
    };

    return (
        <div className="px-8 py-10 flex flex-col items-center">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h1>
                <p className="text-gray-400">Choose the perfect plan for your viewing needs.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative p-8 rounded-[2rem] border transition-all duration-300 ${plan.isPopular
                                ? 'bg-white/10 border-white/20 shadow-2xl backdrop-blur-md scale-105 z-10'
                                : 'bg-black/20 border-white/5 hover:bg-black/40'
                            }`}
                    >
                        {plan.isPopular && (
                            <span className="absolute -top-4 left-8 bg-[#1e2028] border border-white/10 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wider">
                                RECOMMENDED
                            </span>
                        )}

                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="flex items-baseline mb-8">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-gray-400 ml-2 text-sm">/month</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.isPopular ? 'bg-white text-black' : 'bg-white/10 text-gray-400'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleSelectPlan(plan.role)}
                            className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${plan.isPopular
                                    ? 'bg-white text-black hover:bg-gray-200 shadow-lg'
                                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            {user?.plan === plan.role ? 'Current Plan' : 'Get Started'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
