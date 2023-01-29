const express = require('express');
const {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  createContactController,
  updateContactController,
  updateStatusController,
} = require('../../controllers/index');

const router = express.Router();

router.get('/', getContactsController);

router.get('/:contactId', getContactByIdController);

router.post('/', createContactController);

router.delete('/:contactId', deleteContactController);

router.put('/:contactId', updateContactController);

router.patch('/:contactId/favorite', updateStatusController);

module.exports = router;
