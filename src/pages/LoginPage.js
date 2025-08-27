import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await login({ username, password });
            if (response.data.success) {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.error || "Une erreur s'est produite.");
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Connexion</h2>
                
                {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nom d'utilisateur</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Mot de passe</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition">
                        Se connecter
                    </button>
                </form>
                
                <p className="text-center mt-4 text-gray-600">
                    Pas encore de compte ? <Link to="/register" className="text-purple-600 hover:underline">S'inscrire</Link>
                </p>
            </div>
        </div>
    );
}