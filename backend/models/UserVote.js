const mongoose = require('mongoose');

const UserVoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vote: { type: String, required: true },
  sessionId: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserVote', UserVoteSchema);
