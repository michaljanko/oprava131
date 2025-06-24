import { useState } from "react";
import { CheckCircle, ChevronRight, Car, Search } from "lucide-react";

const MODRA = "bg-blue-600 text-white";
const ORANZOVA = "bg-orange-500 text-white";
const TLACIDLO = "rounded-2xl px-8 py-3 shadow-lg font-bold text-lg transition hover:scale-105";

const vybava = [
  { key: "park_kamera", label: "Parkovacia kamera" },
  { key: "predne_senzory", label: "Predné parkovacie senzory" },
  { key: "zadne_senzory", label: "Zadné parkovacie senzory" },
  { key: "navigacia", label: "Navigácia" },
  { key: "tempomat", label: "Adaptívny tempomat" },
  { key: "mrtvy_uhol", label: "Sledovanie mŕtveho uhla" },
  { key: "vyhr_sedadla", label: "Vyhrievané predné sedadlá" },
];

export default function CarculatorDemo() {
  const [krok, setKrok] = useState<"uvod" | "formular" | "leaderboard" | "detail">("uvod");
  const [vyber, setVyber] = useState<any>({});
  const fakeLeaderboard = [
    {
      znacka: "Škoda",
      model: "Karoq",
      verzia: "Drive 130 1.5 TSI DSG",
      cena: "32 141 €",
      vybava: ["navigacia", "park_kamera", "tempomat"],
    },
    {
      znacka: "Hyundai",
      model: "Tucson",
      verzia: "FAMILY 1.6 T-GDi HEV 4x2",
      cena: "34 086 €",
      vybava: ["navigacia", "park_kamera", "mrtvy_uhol"],
    },
  ];
  const [zvoleny, setZvoleny] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      {/* Header */}
      <header className="py-8 flex flex-col items-center justify-center gap-3">
        <Car className="w-12 h-12 text-orange-500" />
        <h1 className="text-4xl font-bold text-blue-700 tracking-tight">Carculator</h1>
        <p className="text-blue-500">Vyber si ideálne auto podľa svojich požiadaviek. Okamžite porovnaj ponuky a výbavy!</p>
      </header>

      {/* Body */}
      <main className="flex-1 flex flex-col items-center justify-start gap-6 max-w-2xl mx-auto w-full px-2">
        {krok === "uvod" && (
          <div className="flex flex-col items-center gap-6">
            <div className="rounded-2xl bg-white shadow-xl p-8 flex flex-col gap-2 items-center">
              <h2 className="text-2xl font-semibold mb-2">Začni výber auta</h2>
              <button
                className={`${ORANZOVA} ${TLACIDLO} flex items-center gap-2`}
                onClick={() => setKrok("formular")}
              >
                <Search className="w-5 h-5" />
                Začať konfiguráciu
              </button>
            </div>
          </div>
        )}

        {krok === "formular" && (
          <form
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              setKrok("leaderboard");
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-blue-700 mb-1">Pohon</label>
                <select className="w-full rounded-xl border border-blue-200 px-4 py-2" required>
                  <option value="">Vyber</option>
                  <option value="2wd">Predný (4x2)</option>
                  <option value="4wd">4x4</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-blue-700 mb-1">Prevodovka</label>
                <select className="w-full rounded-xl border border-blue-200 px-4 py-2" required>
                  <option value="">Vyber</option>
                  <option value="auto">Automat</option>
                  <option value="manual">Manuál</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-blue-700 mb-1">Palivo</label>
                <select className="w-full rounded-xl border border-blue-200 px-4 py-2">
                  <option value="">Nezáleží</option>
                  <option value="benzin">Benzín</option>
                  <option value="nafta">Nafta</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="phev">Plug-in hybrid</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-blue-700 mb-1">Minimálny výkon</label>
                <input
                  type="number"
                  min={70}
                  max={400}
                  className="w-full rounded-xl border border-blue-200 px-4 py-2"
                  placeholder="k"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-blue-700 mb-2">Prvky výbavy</label>
              <div className="flex flex-wrap gap-2">
                {vybava.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    className={`rounded-xl px-4 py-2 border-2 font-semibold flex items-center gap-2 transition ${
                      vyber[p.key]
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-blue-200 bg-white text-blue-700"
                    }`}
                    onClick={() => setVyber((s: any) => ({ ...s, [p.key]: !s[p.key] }))}
                  >
                    {vyber[p.key] && <CheckCircle className="w-4 h-4 text-orange-500" />}
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className={`${MODRA} ${TLACIDLO} w-full`}>
              Zobraziť ponuky <ChevronRight className="inline ml-2" />
            </button>
          </form>
        )}

        {krok === "leaderboard" && (
          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-blue-700">Leaderboard</h2>
              <button
                className={`${ORANZOVA} ${TLACIDLO} py-2 px-5 text-sm`}
                onClick={() => setKrok("formular")}
              >
                Zmeniť parametre
              </button>
            </div>
            <div className="rounded-2xl bg-white shadow p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-blue-500 border-b">
                    <th className="py-2">Model</th>
                    <th>Verzia</th>
                    <th>Výbava</th>
                    <th>Cena</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {fakeLeaderboard.map((row, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2 font-semibold">{row.znacka}</td>
                      <td>{row.model} <span className="block text-xs text-blue-400">{row.verzia}</span></td>
                      <td className="text-sm">
                        <div className="flex flex-wrap gap-1">
                          {row.vybava.map((v: string) => (
                            <span key={v} className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                              {vybava.find(e => e.key === v)?.label || v}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="font-bold text-lg">{row.cena}</td>
                      <td>
                        <button
                          className="rounded-xl px-4 py-1 border border-blue-400 text-blue-700 text-xs font-semibold hover:bg-blue-50"
                          onClick={() => { setZvoleny(i); setKrok("detail"); }}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {fakeLeaderboard.length === 0 && (
                <div className="py-6 text-center text-blue-400">Žiadne ponuky nespĺňajú zadané požiadavky.</div>
              )}
            </div>
          </div>
        )}

        {krok === "detail" && zvoleny !== null && (
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-4">
            <button className="text-sm text-blue-500 mb-2 self-start" onClick={() => setKrok("leaderboard")}>
              ← Späť na ponuky
            </button>
            <h2 className="text-2xl font-bold text-blue-700">
              {fakeLeaderboard[zvoleny].znacka} {fakeLeaderboard[zvoleny].model}
            </h2>
            <div className="text-lg text-blue-500">{fakeLeaderboard[zvoleny].verzia}</div>
            <div>
              <strong className="block mb-1 text-blue-700">Výbava:</strong>
              <div className="flex flex-wrap gap-2">
                {fakeLeaderboard[zvoleny].vybava.map((v: string) => (
                  <span key={v} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-xl">
                    {vybava.find(e => e.key === v)?.label || v}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-xl font-bold text-orange-500">{fakeLeaderboard[zvoleny].cena}</div>
            <button
              className={`${ORANZOVA} ${TLACIDLO} w-full mt-4`}
              onClick={() => setKrok("formular")}
            >
              Získať nezáväznú ponuku
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 bg-blue-100 text-center text-blue-500 mt-12 text-sm">
        &copy; {new Date().getFullYear()} Carculator • Demo verzia • Vytvorené AI asistovaným vývojom
      </footer>
    </div>
  );
}
