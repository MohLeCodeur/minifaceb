import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="bg-white rounded-lg p-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">N+</span>
                        </div>
                        <span className="text-white text-xl font-bold">Nieta+</span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-white hidden sm:block">Bonjour, <span className="font-bold">{user.username}</span></span>
                                <button onClick={handleLogout} className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition">
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-purple-200 transition">Connexion</Link>
                                <Link to="/register" className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition">Inscription</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}