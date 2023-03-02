const { joiRegisterSchema } = require('../../models/user');
const asyncHandler = require('express-async-handler');
const { registerNewUser, findUserByEmail } = require('../../services/authService');
const { v4: uuidv4 } = require('uuid');
const { sendMail } = require('../../helpers');

const registerUser = asyncHandler(async (req, res) => {
  const verificationToken = uuidv4();

  const { error } = joiRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const { email, password, subscription = 'starter' } = req.body;
  const user = await findUserByEmail({ email });

  user
    ? res.status(409).json({ message: 'Email in use' })
    : await registerNewUser({ email, password, verificationToken });

  await sendMail(email, verificationToken);

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
});

module.exports = { registerUser };
