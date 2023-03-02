const { model, Schema } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  avatarURL: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },

  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },

  verify: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const joiVerifySchema = Joi.object({
  email: Joi.string().required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiVerifySchema,
};
