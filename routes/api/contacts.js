const express = require('express');
const {
  getContactsList,
  getContactsById,
  deleteContact,
  createContact,
  changeContact,
  changeStatusContact,
} = require('../../controllers/index');

const router = express.Router();

router.get('/', getContactsList);

router.get('/:contactId', getContactsById);

router.post('/', createContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', changeContact);

router.patch('/:contactId/favorite', changeStatusContact);

module.exports = router;
