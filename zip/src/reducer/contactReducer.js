const initialState = {
  contacts: [
    {
      id: "0",
      name: "Coding Ninjas",
      email: "codingninjas@gmail.com",
      phone: 98725161833,
    },
  ],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return {
        contacts: [...state.contacts, action.payload],
      };
    case "EDIT_CONTACT":
      const updatedContacts = state.contacts.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      return {
        contacts: updatedContacts,
      };
    case "DELETE_CONTACT":
      const filteredContacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      return {
        contacts: filteredContacts,
      };
    case "RESET_CONTACTS":
      return {
        contacts: [],
      };
    default:
      return state;
  }
};

export default contactReducer;
