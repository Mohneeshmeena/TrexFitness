const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: String,
  type: { type: String, enum: ['workout', 'diet', 'exercise', 'meal'] },
  title: String,
  description: String,
  targetSets: { type: Number, default: 3 },
  targetReps: { type: String, default: '' },
  duration: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  completedAt: Date,
  order: { type: Number, default: 0 },
});

const customPlanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['workout', 'diet', 'mixed'], default: 'mixed' },
    items: [itemSchema],
    scheduledDate: Date,
    notes: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CustomPlan', customPlanSchema);
