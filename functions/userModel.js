const mongoose = require('mongoose');

// Схема для пользователя
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: null, // null для отсутствующих данных
  },
  phoneNumber: {
    type: String,
    default: null, // null для отсутствующих данных
  },
  firstContactDate: {
    type: Date,
    default: Date.now, // Дата первого обращения всегда записывается
  },
});

// Модель пользователя
const User = mongoose.model('User', userSchema);

module.exports = User;