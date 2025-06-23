
export default function Step2({ onNext, onBack }) {
  return (
    <div>
      <label>Karoséria:</label>
      <select>
        <option value="hatchback">hatchback</option>
        <option value="SUV">SUV</option>
        <option value="limuzína">limuzína/sedan</option>
        <option value="combi">combi</option>
      </select>
      <button onClick={onBack}>Späť</button>
      <button onClick={onNext}>Ďalej</button>
    </div>
  );
}
