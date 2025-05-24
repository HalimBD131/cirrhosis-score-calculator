import React, { useState } from "react";

function Calculator() {
  const [sbp, setSbp] = useState(0);
  const [alt, setAlt] = useState(0);
  const [meldNa, setMeldNa] = useState(0);
  const [result, setResult] = useState(null);

  function calculate() {
    const expValue = Math.exp(-3.779 - 0.015 * sbp + 0.006 * alt + 0.148 * meldNa);
    const probability = expValue / (1 + expValue);
    setResult(probability < 0.5 ? "live" : "expire");
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Cirrhosis bleeding score calculator</h1>
        <p className="mb-6">
          Calculator to predict in-hospital mortality in patients with cirrhosis admitted with acute upper gastrointestinal bleeding
        </p>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Systolic blood pressure at admission:</label>
            <span className="text-sm italic text-gray-600">(accepted range: 59 to 197 mmHg)</span>
            <input
              type="number"
              value={sbp}
              onChange={(e) => setSbp(Number(e.target.value))}
              className="border border-gray-300 p-2 mt-1 w-full max-w-xs"
            />
          </div>

          <div>
            <label className="block font-semibold">Alanine aminotransferase (ALT) at admission:</label>
            <span className="text-sm italic text-gray-600">(accepted range: 6 to 515 U/L)</span>
            <input
              type="number"
              value={alt}
              onChange={(e) => setAlt(Number(e.target.value))}
              className="border border-gray-300 p-2 mt-1 w-full max-w-xs"
            />
          </div>

          <div>
            <label className="block font-semibold">MELD-Na at admission:</label>
            <span className="text-sm italic text-gray-600">(accepted range: 6 to 40)</span>
            <input
              type="number"
              value={meldNa}
              onChange={(e) => setMeldNa(Number(e.target.value))}
              className="border border-gray-300 p-2 mt-1 w-full max-w-xs"
            />
          </div>

          <button onClick={calculate} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            Calculate
          </button>

          {result !== null && (
            <div className="text-lg mt-4 font-semibold">
              Patient is most likely to: {result}
            </div>
          )}

          <p className="text-sm italic mt-6 text-gray-600">
            This calculator is based on the manuscript by Bou Daher et al. <br />
            DOI: XXXXXXXXXXXX
          </p>
        </div>
      </main>

      <footer className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="text-sm">
          Digestive Disease <br /> Research Center <br />
          at the Medical University of South Carolina
        </div>
        <img src="/logo.png" alt="Digestive Disease Research Center Logo" className="h-12" />
      </footer>
    </div>
  );
}

export default Calculator;
