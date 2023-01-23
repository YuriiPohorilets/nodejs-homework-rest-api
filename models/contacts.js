const fs = require('fs/promises');
const path = require('node:path');

const contactsPath = path.resolve('models', 'contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contactById = contacts.filter(contact => contact.id === contactId);

  return contactById;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const filtredContacts = contacts.filter(contact => contact.id !== contactId);

  fs.writeFile(contactsPath, JSON.stringify(filtredContacts, null, 2));
  return [[...contacts], [...filtredContacts]];
};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
