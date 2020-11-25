import Head from "next/head";
import { EmptyBook } from "containers/EmptyBook/EmptyBook";
import { ContactsTable } from "containers/ContactsTable/ContactsTable";
import { store } from "contexts/Contacts";
import { useContext } from "react";

export default function Home() {
  const { state } = useContext(store);
  return <main>{state.contacts.length ? <ContactsTable /> : <EmptyBook />}</main>;
}
