const argv = require("yargs").argv;
const { listContacts, addContact, removeContact, getContactById } = require("./contacts.js");

// TODO: refaktor
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await listContacts();
      console.table(data);
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
