const { Contact } = require('../db/contactModel');

const listContacts = async () => {
  const contacts = await Contact.find({});

  return contacts;
};

const getContactById = async contactId => {
  const contactById = await Contact.findById(contactId);

  return contactById;
};

const removeContact = async contactId => {
  Contact.findByIdAndRemove(contactId);
};

const addContact = async ({ name, email, phone, favorite }) => {
  const newContact = await new Contact({ name, email, phone, favorite });
  await newContact.save();

  return newContact;
};

const updateContact = async (contactId, { name, email, phone, favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favorite },
  });

  return updatedContact;
};

const updateStatusContact = async (contactId, { name, email, phone, favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favorite },
  });

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
