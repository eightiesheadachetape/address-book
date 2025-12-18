import AddContactForm from "./components/AddContactForm";
import ContactsTable from "./components/ContactsTable";
import SearchBar from "./components/SearchBar";
import { useContacts } from "./hooks/useContacts";


export default function App() {
  const { filtered, query, setQuery, addContact, updateContact } = useContacts();

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 12, fontFamily: "Arial" }}>
      <h2 style={{ marginTop: 0 }}>Address Book</h2>

      <AddContactForm onAdd={addContact} />
      <SearchBar value={query} onChange={setQuery} />
      <ContactsTable rows={filtered} onUpdate={updateContact} />
    </div>
  );
}
