import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPosts, createPost } from '../services/api';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts();
                if (response.data.success) {
                    setPosts(response.data.posts);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des posts", error);
            }
        };
        fetchPosts();
    }, []);

    const handlePostCreated = async (content) => {
        try {
            const response = await createPost(content);
            if (response.data.success) {
                // Ajoute le nouveau post en haut de la liste
                setPosts([response.data.post, ...posts]);
            }
        } catch (error) {
            alert("Erreur lors de la publication. Assurez-vous d'être connecté.");
        }
    };

    return (
        <div className="space-y-6">
            {user ? (
                <PostForm onPostCreated={handlePostCreated} />
            ) : (
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 text-center">
                    <p className="text-gray-700 text-lg">Connectez-vous pour publier du contenu !</p>
                    <Link to="/login" className="inline-block mt-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition">
                        Se connecter
                    </Link>
                </div>
            )}

            {posts.length > 0 ? (
                posts.map(post => <Post key={post.id} post={post} />)
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500">Aucune publication pour le moment. Soyez le premier à publier !</p>
                </div>
            )}
        </div>
    );
}