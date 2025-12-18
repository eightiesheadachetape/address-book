import { useMemo, useState } from "react";

export function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter((c) =>
      [c.firstName, c.lastName, c.phone, String(c.id)]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [contacts, query]);

  function addContact(payload) {
    setContacts((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((x) => x.id)) + 1 : 1;
      return [...prev, { id: nextId, ...payload }];
    });
  }

  function updateContact(id, patch) {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  return { contacts, filtered, query, setQuery, addContact, updateContact };
}
