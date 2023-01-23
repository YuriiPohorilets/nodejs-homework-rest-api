const express = require('express');
const { listContacts, getContactById, removeContact } = require('../../models/contacts');

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
    const contacts = await getContactById(contactId);

    contacts.length !== 0
      ? res.status(200).json(contacts)
      : res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const [contacts, filtredContacts] = await removeContact(contactId);

    contacts.length !== filtredContacts.length
      ? res.status(200).json({ message: `Contact by ID ${contactId}: deleted` })
      : res.status(404).json({ message: `Contact by ID ${contactId}: not found` });
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
