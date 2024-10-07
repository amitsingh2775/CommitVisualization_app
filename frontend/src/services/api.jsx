import axios from 'axios';

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:5000';

// Function to log in using GitHub
export const login = async () => {
    // Redirect the user to GitHub login
    window.location.href = `${API_BASE_URL}/auth/github`;
};

// Function to get the current user
export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/current_user`, { withCredentials: true });
        return response.data; // Return user data
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null; // Return null if there's an error
    }
};

// Function to get user repositories
export const getRepos = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/repos`, { withCredentials: true });
        return response.data; // Return repositories data
    } catch (error) {
        console.error("Error fetching repositories:", error);
        throw error; // Rethrow error for handling in the calling function
    }
};

// Function to get commits for a specific repository
export const getCommits = async (owner, repo) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/repos/${owner}/${repo}/commits`, { withCredentials: true });
        return response.data; // Return commits data
    } catch (error) {
        console.error("Error fetching commits:", error);
        throw error; // Rethrow error for handling in the calling function
    }
};

// Function to get details for a specific commit
export const getCommitDetails = async (owner, repo, sha) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/repos/${owner}/${repo}/commits/${sha}`, { withCredentials: true });
        return response.data; // Return commit details
    } catch (error) {
        console.error("Error fetching commit details:", error);
        throw error; // Rethrow error for handling in the calling function
    }
};
