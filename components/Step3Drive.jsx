
export default function Step3({ onNext, onBack }) {
  return (
    <div>
      <label>Pohon:</label>
      <select>
        <option value="benzín/hybrid">benzín/hybrid</option>
        <option value="elektrina">elektrina</option>
        <option value="nafta">nafta</option>
        <option value="plug-in hybrid">plug-in hybrid</option>
      </select>
      <button onClick={onBack}>Späť</button>
      <button onClick={onNext}>Ďalej</button>
    </div>
  );
}
