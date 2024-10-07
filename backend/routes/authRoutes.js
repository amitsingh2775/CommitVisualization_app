const express = require('express');
const passport = require('passport');
const router = express.Router();

// Auth Routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect('http://localhost:5173/repos'); // Redirect to your frontend after login
});

router.get('/current_user', (req, res) => {
    res.send(req.user); // Send user data
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
