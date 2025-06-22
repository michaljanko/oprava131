import { useState } from 'react';

export default function CarculatorWizard({ onComplete }) {
  const [formData, setFormData] = useState({ typ: '', pohon: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div>
        <label>Typ auta:</label>
        <select
          value={formData.typ}
          onChange={(e) => setFormData({ ...formData, typ: e.target.value })}
        >
          <option value="">-- vyber --</option>
          <option value="mestské">mestské</option>
          <option value="kompaktné">kompaktné</option>
          <option value="stredné">stredné</option>
          <option value="veľké">veľké</option>
        </select>
      </div>
      <div>
        <label>Pohon:</label>
        <select
          value={formData.pohon}
          onChange={(e) => setFormData({ ...formData, pohon: e.target.value })}
        >
          <option value="">-- vyber --</option>
          <option value="benzín">benzín</option>
          <option value="nafta">nafta</option>
          <option value="elektrina">elektrina</option>
        </select>
      </div>
      <button type="submit">Vybrať auto</button>
    </form>
  );
}