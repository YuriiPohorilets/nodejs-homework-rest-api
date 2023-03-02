const { joiVerifySchema } = require('../../models/user');
const asyncHandler = require('express-async-handler');
const { findUserByEmail } = require('../../services/authService');
const { sendMail } = require('../../helpers');

const verify = asyncHandler(async (req, res) => {
  const { error } = joiVerifySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Missing required field email' });
  }

  const { email } = req.body;
  const user = await findUserByEmail({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.verify) {
    return res.status(400).json({ message: 'Verification has already been passed' });
  }

  await sendMail(email, user.verificationToken);

  res.status(200).json({ message: 'Verification email sent' });
});

module.exports = { verify };
