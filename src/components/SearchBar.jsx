export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ margin: "12px 0" }}>
      <input
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />
    </div>
  );
}
