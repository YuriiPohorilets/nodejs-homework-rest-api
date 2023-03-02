const sgMail = require('@sendgrid/mail');

const sendMail = async (email, verificationToken) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: 'say_g@ukr.net',
    subject: 'Verification email address',
    html: `<p>By clicking on the following link, you are confirming your email address. 
    <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Confirm email address</a></p>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendMail;
