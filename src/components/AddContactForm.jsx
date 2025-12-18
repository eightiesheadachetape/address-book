import { useState } from "react";
import { requiredMessage, validateRequired } from "../utils/validators";

const fieldLabels = {
  firstName: "first name",
  lastName: "last name",
  phone: "phone",
};

export default function AddContactForm({ onAdd }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [errors, setErrors] = useState({});

  function setField(name, value) {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  }

  function validate() {
    const next = {};
    (["firstName", "lastName", "phone"]).forEach((k) => {
      if (!validateRequired(form[k])) next[k] = requiredMessage(fieldLabels[k]);
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    onAdd({ ...form });
    setForm({ firstName: "", lastName: "", phone: "" });
  }

  return (
    <form onSubmit={submit} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 10 }}>
      <h3 style={{ marginTop: 0 }}>Add contact</h3>

      <div style={{ display: "grid", gap: 10 }}>
        <div>
          <label>First Name*</label>
          <input
            value={form.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.firstName && <div style={{ color: "red" }}>{errors.firstName}</div>}
        </div>

        <div>
          <label>Last Name*</label>
          <input
            value={form.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.lastName && <div style={{ color: "red" }}>{errors.lastName}</div>}
        </div>

        <div>
          <label>Phone*</label>
          <input
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
          {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
        </div>

        <button type="submit" style={{ padding: 10, cursor: "pointer" }}>
          Add
        </button>
      </div>
    </form>
  );
}
