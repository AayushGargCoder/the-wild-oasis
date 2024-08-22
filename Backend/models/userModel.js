const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have an username'],
  },
  email: {
    type: String,
    required: [true, 'A user should have an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'a user must have a password'],
    select: false,
  },
});

userSchema.methods.correctPassword = async function (
  userPassword,
  passwordInDb
) {
  return await bcrypt.compare(userPassword, passwordInDb);
};
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
