const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    displayName: { type: String, required: true },
    profileUrl: { type: String },
    avatarUrl: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
