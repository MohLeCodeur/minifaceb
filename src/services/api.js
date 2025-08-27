import axios from 'axios';

// Crée une instance d'axios avec la configuration de base
const api = axios.create({
    baseURL: 'https://net.mohlecodeur.com/api', // Adaptez l'URL à votre configuration
    withCredentials: true // Très important pour que les sessions/cookies fonctionnent
});

// Fonctions pour interagir avec l'API
export const getPosts = () => api.get('/posts.php');
export const createPost = (content) => api.post('/posts.php', { content });

export const loginUser = (credentials) => api.post('/users.php?action=login', credentials);
export const registerUser = (userData) => api.post('/users.php?action=register', userData);
export const logoutUser = () => api.get('/users.php?action=logout');
export const checkAuthStatus = () => api.get('/users.php?action=check_auth');

export default api;