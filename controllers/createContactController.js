const { addContact } = require('../services/contactsService');
const { schema } = require('../schemas/joiSchema');
const asyncHandler = require('express-async-handler');

const createContactController = asyncHandler(async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const contact = req.body;
  const newContact = await addContact(contact);

  res.status(201).json(newContact);
});

module.exports = {
  createContactController,
};
