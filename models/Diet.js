const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  item: String,
  amount: String,
  calories: Number,
});

const mealMacrosSchema = new mongoose.Schema({
  protein: Number,
  carbs: Number,
  fats: Number,
  calories: Number,
});

const mealSchema = new mongoose.Schema({
  mealTime: String,
  name: String,
  ingredients: [ingredientSchema],
  preparation: String,
  macros: mealMacrosSchema,
});

const dietSchema = new mongoose.Schema(
  {
    planType: {
      type: String,
      enum: ['veg', 'non-veg', 'creative'],
      required: true,
    },
    name: { type: String, required: true },
    description: String,
    targetGoal: {
      type: String,
      enum: ['cutting', 'bulking', 'maintenance', 'keto', 'intermittent-fasting'],
    },
    dailyCalories: Number,
    macros: {
      protein: Number,
      carbs: Number,
      fats: Number,
    },
    meals: [mealSchema],
    healthBenefits: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Diet', dietSchema);
