const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

const userPayload = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  stats: user.stats,
  achievements: user.achievements,
});

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ token, user: userPayload(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ token, user: userPayload(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/me and /api/users/profile
router.put(['/me', '/profile'], auth, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { name, avatar } },
      { new: true, runValidators: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/me/stats and /api/users/stats
router.put(['/me/stats', '/stats'], auth, async (req, res) => {
  try {
    const { completedWorkouts, caloriesBurned, minutesWorked, currentStreak } = req.body;
    const inc = {};
    if (completedWorkouts) inc['stats.completedWorkouts'] = completedWorkouts;
    if (caloriesBurned) inc['stats.totalCaloriesBurned'] = caloriesBurned;
    if (minutesWorked) inc['stats.totalMinutesWorked'] = minutesWorked;
    if (currentStreak) inc['stats.currentStreak'] = currentStreak;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $inc: inc },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/me/achievements
router.get('/me/achievements', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('achievements');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/me/achievements
router.post('/me/achievements', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { achievements: req.body } },
      { new: true }
    ).select('achievements');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(201).json(user.achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
