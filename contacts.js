const { table } = require("console");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const { nanoid } = require("nanoid");

// TODO: udokumentuj każdą funkcję

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    console.log(contact);
    return contact;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== contactId);
  console.table(filteredContacts);
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  console.log(newContact);
  const contacts = await listContacts();
  contacts.push(newContact);
  console.table(contacts);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
