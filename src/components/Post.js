import React from 'react';

export default function Post({ post }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {post.username.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-gray-800">{post.username}</h3>
                        <span className="text-gray-500 text-sm">• {formatDate(post.created_at)}</span>
                    </div>
                    <p className="mt-2 text-gray-700 whitespace-pre-wrap">{post.content}</p>
                </div>
            </div>
        </div>
    );
}