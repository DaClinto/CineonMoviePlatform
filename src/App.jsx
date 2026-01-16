import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { MovieProvider } from './context/MovieContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'

// Pages
import Home from './pages/Home'
import Movie from './pages/Movie'
import Watchlist from './pages/Watchlist'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import Success from './pages/Success'
import Genre from './pages/Genre'
import Favorites from './pages/Favorites'
import Series from './pages/Series'
import Originals from './pages/Originals'
import Notifications from './pages/Notifications'

const SearchPage = () => <Genre />

import AdminDashboard from './admin/Dashboard'

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <MovieProvider>
                    <div className="min-h-screen w-full flex items-start justify-center p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
                        {/* Main Glass Container */}
                        <div className="w-full max-w-[1600px] min-h-[85vh] xs:min-h-[88vh] sm:min-h-[90vh] glass-panel rounded-xl xs:rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col relative">

                            <Navbar />

                            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/movie/:id" element={<Movie />} />
                                    <Route path="/watchlist" element={<Watchlist />} />
                                    <Route path="/pricing" element={<Pricing />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/success" element={<Success />} />
                                    <Route path="/genre/:id/:name" element={<Genre />} />
                                    <Route path="/favorites" element={<Favorites />} />
                                    <Route path="/series" element={<Series />} />
                                    <Route path="/originals" element={<Originals />} />
                                    <Route path="/notifications" element={<Notifications />} />
                                    <Route path="/admin/*" element={<AdminDashboard />} />
                                </Routes>

                                <div className="p-4 xs:p-6 text-center text-white/20 text-[10px] xs:text-xs text-white">
                                    © 2024 Cinéon. All rights reserved.
                                </div>
                            </div>
                        </div>
                    </div>
                </MovieProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
