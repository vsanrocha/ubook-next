import React, { createContext, Dispatch, useReducer } from "react";

interface Contact {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
}

type InitialStateType = {
  contacts: Contact[];
  highlightContact: number;
};

type ContextType = {
  state: InitialStateType;
  dispatch: Dispatch<{
    type: "add" | "edit" | "delete" | "highlight";
    payload: any;
  }>;
};

const initialState: InitialStateType = {
  contacts: [],
  highlightContact: 0,
};

const StoreContext = createContext<ContextType>({
  state: initialState,
} as ContextType);
const store = StoreContext;

const contactReducer = (state: Contact[], action: any) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload.contact];
    case "edit":
      const newContacts = [...state];
      const editedContactIndex = newContacts.findIndex(
        (contact) => contact.id === action.payload.contact.id
      );
      newContacts[editedContactIndex] = action.payload.contact;
      return newContacts;
    case "delete":
      return [
        ...state.filter(
          (contact: { id: number }) => contact.id !== action.payload.id
        ),
      ];
    default:
      return state;
  }
};

const highlightContactReducer = (state: number, action: any) => {
  switch (action.type) {
    case "highlight":
      return action.payload;
    default:
      return state;
  }
};

const mainReducer = (
  { contacts, highlightContact }: InitialStateType,
  action: any
) => ({
  contacts: contactReducer(contacts, action),
  highlightContact: highlightContactReducer(highlightContact, action),
});

const StateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { store, StateProvider };
