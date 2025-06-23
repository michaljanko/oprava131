
export default function Step1({ onNext }) {
  return (
    <div>
      <label>Typ auta:</label>
      <select>
        <option value="mestské">mestské</option>
        <option value="kompaktné">kompaktné</option>
        <option value="stredné">stredné</option>
        <option value="veľké">veľké</option>
      </select>
      <button onClick={onNext}>Ďalej</button>
    </div>
  );
}
