import { useState } from "react";
import { requiredMessage, validateRequired } from "../utils/validators";

const labels = {
  firstName: "first name",
  lastName: "last name",
  phone: "phone",
};

export default function ContactsTable({ rows, onUpdate }) {
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState({ firstName: "", lastName: "", phone: "" });
  const [errors, setErrors] = useState({});

  function startEdit(row) {
    setEditId(row.id);
    setDraft({ firstName: row.firstName, lastName: row.lastName, phone: row.phone });
    setErrors({});
  }

  function cancel() {
    setEditId(null);
    setErrors({});
  }

  function setField(k, v) {
    setDraft((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  }

  function validate() {
    const next = {};
    (["firstName", "lastName", "phone"]).forEach((k) => {
      if (!validateRequired(draft[k])) next[k] = requiredMessage(labels[k]);
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function save(id) {
    if (!validate()) return;
    onUpdate(id, { ...draft });
    setEditId(null);
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 10 }}>
      <h3 style={{ marginTop: 0 }}>Contacts</h3>

      {rows.length === 0 ? (
        <div>No data to display.</div>
      ) : (
        <table width="100%" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left" style={{ borderBottom: "1px solid #ddd" }}>id</th>
              <th align="left" style={{ borderBottom: "1px solid #ddd" }}>First Name</th>
              <th align="left" style={{ borderBottom: "1px solid #ddd" }}>Last Name</th>
              <th align="left" style={{ borderBottom: "1px solid #ddd" }}>Phone</th>
              <th align="left" style={{ borderBottom: "1px solid #ddd" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => {
              const isEdit = r.id === editId;

              return (
                <tr key={r.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td>{r.id}</td>

                  <td>
                    {isEdit ? (
                      <>
                        <input
                          value={draft.firstName}
                          onChange={(e) => setField("firstName", e.target.value)}
                        />
                        {errors.firstName && <div style={{ color: "red" }}>{errors.firstName}</div>}
                      </>
                    ) : (
                      r.firstName
                    )}
                  </td>

                  <td>
                    {isEdit ? (
                      <>
                        <input
                          value={draft.lastName}
                          onChange={(e) => setField("lastName", e.target.value)}
                        />
                        {errors.lastName && <div style={{ color: "red" }}>{errors.lastName}</div>}
                      </>
                    ) : (
                      r.lastName
                    )}
                  </td>

                  <td>
                    {isEdit ? (
                      <>
                        <input value={draft.phone} onChange={(e) => setField("phone", e.target.value)} />
                        {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
                      </>
                    ) : (
                      r.phone
                    )}
                  </td>

                  <td>
                    {isEdit ? (
                      <>
                        <button onClick={() => save(r.id)}>Save</button>{" "}
                        <button onClick={cancel}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => startEdit(r)}>Edit</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
