const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);

    contactById.length !== 0
      ? res.status(200).json(contactById)
      : res.status(404).json({ message: `Contact by ID ${contactId}: not found` });
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(500).json({ message: 'Missing required name field' });
    }

    const { name, email, phone } = req.body;
    const newContact = await addContact({ name, email, phone });

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);

    res.status(201).json(`Contact by ID ${contactId}: deleted`);
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(500).json({ message: 'Missing fields' });
    }

    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const updatedContact = await updateContact(contactId, { name, email, phone });

    !updatedContact
      ? res.status(404).json({ message: `Contact by ID ${contactId}: not found` })
      : res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
});

module.exports = router;
