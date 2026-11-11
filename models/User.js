const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const achievementSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  unlockedAt: { type: Date, default: Date.now },
  icon: String,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, default: '' },
    stats: {
      completedWorkouts: { type: Number, default: 0 },
      currentStreak: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
      totalCaloriesBurned: { type: Number, default: 0 },
      totalMinutesWorked: { type: Number, default: 0 },
    },
    achievements: [achievementSchema],
  },
  { timestamps: true }
);

// Pre-save hook: hash password if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method: compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
