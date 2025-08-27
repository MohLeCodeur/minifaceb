import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError("Le mot de passe doit faire au moins 6 caractères.");
            return;
        }
        try {
            const response = await register({ username, email, password });
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
                <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Inscription</h2>
                
                {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nom d'utilisateur</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    </div>
                     <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Mot de passe</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength="6" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition">
                        S'inscrire
                    </button>
                </form>
                
                <p className="text-center mt-4 text-gray-600">
                    Déjà un compte ? <Link to="/login" className="text-purple-600 hover:underline">Se connecter</Link>
                </p>
            </div>
        </div>
    );
}