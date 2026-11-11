const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: String,
  reps: String,
  sets: { type: Number, default: 3 },
  duration: String,
  restTime: { type: Number, default: 60 },
  imageUrl: { type: String, default: '' },
  gifUrl: { type: String, default: '' },
  instructions: String,
  targetMuscles: [String],
  tips: [String],
});

const workoutSchema = new mongoose.Schema(
  {
    muscleGroup: {
      type: String,
      enum: ['abs', 'biceps', 'back', 'triceps', 'chest', 'shoulder', 'legs'],
      required: true,
    },
    category: {
      type: String,
      enum: ['home', 'gym', 'stretching', 'dumbbell'],
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    duration: { type: Number, default: 45 },
    caloriesBurn: { type: Number, default: 300 },
    exercises: [exerciseSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workout', workoutSchema);
