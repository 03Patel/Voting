const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const UserVote = require('../models/UserVote');

// Login route - generate sessionId
router.post('/login', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  const sessionId = uuidv4();
  res.json({ name, sessionId });
});

// Vote route
router.post('/vote', async (req, res) => {
  const { sessionId, name, option } = req.body;
  if (!sessionId || !name || !option)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    // Check if this session already voted
    const existingVote = await UserVote.findOne({ sessionId });
    if (existingVote)
      return res.status(400).json({ message: 'You have already voted' });

    const vote = new UserVote({ name, vote: option, sessionId });
    await vote.save();

    res.json({ message: 'Vote cast successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Results route
router.get('/results', async (req, res) => {
  try {
    const votes = await UserVote.find();
    const tally = votes.reduce((acc, curr) => {
      acc[curr.vote] = (acc[curr.vote] || 0) + 1;
      return acc;
    }, {});

    res.json(tally);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
