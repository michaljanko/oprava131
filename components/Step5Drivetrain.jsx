
export default function Step5({ onNext, onBack }) {
  return (
    <div>
      <label>Pohon 4x4:</label>
      <select>
        <option value="áno">áno</option>
        <option value="nie">nie</option>
      </select>
      <button onClick={onBack}>Späť</button>
      <button onClick={onNext}>Ďalej</button>
    </div>
  );
}
