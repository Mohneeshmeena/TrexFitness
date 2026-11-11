const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// GET /api/workouts
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.muscleGroup) filter.muscleGroup = req.query.muscleGroup;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    const workouts = await Workout.find(filter);
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/workouts/:id
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/workouts
router.post('/', async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/workouts/:id
router.put('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/workouts/:id
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
