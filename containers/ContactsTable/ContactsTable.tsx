import { useContext, useEffect, useState } from "react";
import { Table } from "components/Table/Table";
import { store } from "contexts/Contacts";

export const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const { state } = useContext(store);
  useEffect(() => {
    const data = state.contacts.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    setContacts(data);
  }, [state.contacts]);

  const headers = ["", "Contatos", "E-mail", "Telefone", ""];

  return <Table wrapperClass="col-12" headers={headers} items={contacts} />;
};
