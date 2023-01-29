const { getContactsController } = require('./getContactsController');
const { getContactByIdController } = require('./getContactByIdController');
const { deleteContactController } = require('./deleteContactController');
const { createContactController } = require('./createContactController');
const { updateContactController } = require('./updateContactController');
const { updateStatusController } = require('./updateStatusContactController');

module.exports = {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  createContactController,
  updateContactController,
  updateStatusController,
};
