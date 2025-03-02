import axios from "axios";
import { prodenv } from '../config/config';

const API_URL = prodenv ? "https://realtalk-yqr6.onrender.com/api/users" : "http://localhost:3000/api/users";

/**
 * Sends a login request to the backend API.
 * @param {Object} userData - User credentials (email and password)
 * @returns {Promise<Object>} - Response with token & message
 */
const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            const user = atob(response.data.token.split(".")[1]);
            localStorage.setItem('user', user);
        }

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Something went wrong");
    }
};

const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);

        console.log(response.data.token)

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            const user = atob(response.data.token.split(".")[1]);
            localStorage.setItem('user', user);
        }

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Something went wrong");
    }
};

const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? token : null;
}

export { login, register, getUser, getToken };
