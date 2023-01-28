const { updateStatusContact } = require('../models/contacts');
const { schema } = require('../schemas/joiSchema');

const changeStatusContact = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(500).json({ message: 'Missing fields' });
    }

    const { contactId } = req.params;
    const contact = req.body;

    if (!contact) {
      return res.status(400).json({ message: `Missing field favorite` });
    }

    const updatedContact = await updateStatusContact(contactId, contact);

    !updatedContact
      ? res.status(404).json({ message: `Contact by ID ${contactId}: not found` })
      : res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};

module.exports = {
  changeStatusContact,
};
