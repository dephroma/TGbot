const mongoose = require('mongoose');

// Схема для пользователя
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  firstContactDate: {
    type: Date,
    default: Date.now, // дата первого обращения
  },
});

// Модель пользователя
const User = mongoose.model('User', userSchema);

module.exports = User;