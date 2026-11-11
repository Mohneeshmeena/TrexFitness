const express = require('express');
const router = express.Router();
const CustomPlan = require('../models/CustomPlan');
const auth = require('../middleware/auth');

// All routes require auth
router.use(auth);

const getUserId = (req) => req.user._id || req.user.userId;

// GET /api/custom-plans
router.get('/', async (req, res) => {
  try {
    const plans = await CustomPlan.find({ user: getUserId(req) });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/custom-plans
router.post('/', async (req, res) => {
  try {
    const plan = new CustomPlan({ ...req.body, user: getUserId(req) });
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/custom-plans/:id
router.get('/:id', async (req, res) => {
  try {
    const plan = await CustomPlan.findOne({ _id: req.params.id, user: getUserId(req) });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/custom-plans/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, notes, scheduledDate, isActive } = req.body;
    const plan = await CustomPlan.findOneAndUpdate(
      { _id: req.params.id, user: getUserId(req) },
      { $set: { name, notes, scheduledDate, isActive } },
      { new: true, runValidators: true }
    );
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/custom-plans/:id
router.delete('/:id', async (req, res) => {
  try {
    const plan = await CustomPlan.findOneAndDelete({ _id: req.params.id, user: getUserId(req) });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({ message: 'Plan deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/custom-plans/:id/items/:itemId and /api/custom-plans/:id/items/:itemId/toggle
router.patch(['/:id/items/:itemId', '/:id/items/:itemId/toggle'], async (req, res) => {
  try {
    const plan = await CustomPlan.findOne({ _id: req.params.id, user: getUserId(req) });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    const item = plan.items.find((i) => i.id === req.params.itemId || i._id.toString() === req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.completed = !item.completed;
    if (item.completed) item.completedAt = new Date();
    else item.completedAt = undefined;

    await plan.save();
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/custom-plans/:id/items — add item
router.post('/:id/items', async (req, res) => {
  try {
    const plan = await CustomPlan.findOne({ _id: req.params.id, user: getUserId(req) });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    plan.items.push(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/custom-plans/:id/items/:itemId — remove item
router.delete('/:id/items/:itemId', async (req, res) => {
  try {
    const plan = await CustomPlan.findOne({ _id: req.params.id, user: getUserId(req) });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    const itemId = req.params.itemId;
    const originalLen = plan.items.length;
    plan.items = plan.items.filter(
      (i) => i.id !== itemId && i._id.toString() !== itemId
    );
    if (plan.items.length === originalLen) {
      return res.status(404).json({ message: 'Item not found' });
    }
    await plan.save();
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
