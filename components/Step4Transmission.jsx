
export default function Step4({ onNext, onBack }) {
  return (
    <div>
      <label>Prevodovka:</label>
      <select>
        <option value="manuál">manuál</option>
        <option value="automat">automat</option>
      </select>
      <button onClick={onBack}>Späť</button>
      <button onClick={onNext}>Ďalej</button>
    </div>
  );
}
