const express = require('express');
const router = express.Router();
const Diet = require('../models/Diet');

// GET /api/diets
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.planType) filter.planType = req.query.planType;
    if (req.query.targetGoal) filter.targetGoal = req.query.targetGoal;
    const diets = await Diet.find(filter);
    res.json(diets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/diets/:id
router.get('/:id', async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.id);
    if (!diet) return res.status(404).json({ message: 'Diet plan not found' });
    res.json(diet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/diets
router.post('/', async (req, res) => {
  try {
    const diet = new Diet(req.body);
    await diet.save();
    res.status(201).json(diet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/diets/:id
router.put('/:id', async (req, res) => {
  try {
    const diet = await Diet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!diet) return res.status(404).json({ message: 'Diet plan not found' });
    res.json(diet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/diets/:id
router.delete('/:id', async (req, res) => {
  try {
    const diet = await Diet.findByIdAndDelete(req.params.id);
    if (!diet) return res.status(404).json({ message: 'Diet plan not found' });
    res.json({ message: 'Diet plan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
