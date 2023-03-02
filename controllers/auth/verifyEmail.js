const asyncHandler = require('express-async-handler');
const { findUserByVerifyToken, verifyUser } = require('../../services/authService');

const verifyEmail = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await findUserByVerifyToken({ verificationToken });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await verifyUser(user._id);

  res.status(200).json({ message: 'Verification successful' });
});

module.exports = { verifyEmail };
