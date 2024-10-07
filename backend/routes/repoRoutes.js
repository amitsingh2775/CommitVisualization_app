const express = require('express');
const axios = require('axios');
const router = express.Router();
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

// Get user repositories
router.get('/repos', isAuthenticated, async (req, res) => {
    try {
        const username = req.user.username;
        const response = await axios.get(`https://api.github.com/users/${username}/repos?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching repositories' });
    }
});

// Get commits for a specific repository
router.get('/repos/:owner/:repo/commits', isAuthenticated, async (req, res) => {
    try {
        const { owner, repo } = req.params;
        
        // Check if owner and repo are provided
        if (!owner || !repo) {
            return res.status(400).json({ message: 'Owner and repo are required' });
        }
        
        // Make request to GitHub API
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`);
        
        // Check if response is valid
        if (!response || !response.data) {
            return res.status(404).json({ message: 'No commits found' });
        }

        // Send the data back
        res.json(response.data);
    } catch (error) {
        // Log the error message and any additional information
        console.error("Error fetching commits:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        res.status(500).json({ message: 'Error fetching commits' });
    }
});

// **New Route for fetching specific commit details**
router.get('/repos/:owner/:repo/commits/:sha', isAuthenticated, async (req, res) => {
    try {
        const { owner, repo, sha } = req.params;

        // Check if owner, repo, and sha are provided
        if (!owner || !repo || !sha) {
            return res.status(400).json({ message: 'Owner, repo, and SHA are required' });
        }

        // Make request to GitHub API for specific commit details
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits/${sha}?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`);

        // Send the data back
        res.json(response.data);
    } catch (error) {
        // Log the error message and any additional information
        console.error("Error fetching commit details:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        }
        res.status(500).json({ message: 'Error fetching commit details' });
    }
});

module.exports = router;
