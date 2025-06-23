
export default function Step7({ onBack }) {
  return (
    <div>
      <label><input type="checkbox" /> Klimatizácia</label>
      <label><input type="checkbox" /> Navigácia</label>
      <label><input type="checkbox" /> Vyhrievané sedadlá</label>
      <button onClick={onBack}>Späť</button>
      <button>Odoslať</button>
    </div>
  );
}
