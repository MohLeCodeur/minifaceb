import React, { useState } from 'react';

export default function PostForm({ onPostCreated }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content.trim()) {
            onPostCreated(content);
            setContent('');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Publier quelque chose</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition"
                    rows="3"
                    placeholder="Quoi de neuf ?"
                    required
                ></textarea>
                <button type="submit" className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105">
                    Publier
                </button>
            </form>
        </div>
    );
}