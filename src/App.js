import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';

function App() {
  const [sbp, setSbp] = useState('');
  const [alt, setAlt] = useState('');
  const [meldNa, setMeldNa] = useState('');
  const [result, setResult] = useState('');

  const calculateRisk = () => {
  const sbpVal = parseFloat(sbp);
  const altVal = parseFloat(alt);
  const meldVal = parseFloat(meldNa);

  if (
    isNaN(sbpVal) || sbpVal < 59 || sbpVal > 197 ||
    isNaN(altVal) || altVal < 6 || altVal > 515 ||
    isNaN(meldVal) || meldVal < 6 || meldVal > 40
  ) {
    setResult("Please enter valid values in all fields.");
    return;
  }

  // ✨ Your logistic regression formula
  const expValue = Math.exp(-3.779 - (0.015 * sbpVal) + (0.006 * altVal) + (0.148 * meldVal));
  const probability = expValue / (1 + expValue);

  // 💡 Optional: round probability to 2 decimals if you want to display it
  const probPercent = (probability * 100).toFixed(1);

  setResult(
    `Patient is more likely to ${probability < 0.5 ? "SURVIVE" : "EXPIRE"}`
  );
};


  return (
    <div className="container">
      <h1 className="title">CIRRHOSIS BLEEDING SCORE CALCULATOR</h1>
      <p className="subtitle">
        Calculator to predict in-hospital mortality in patients with cirrhosis admitted with acute upper gastrointestinal bleeding
      </p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>
            Systolic blood pressure at admission<br />
            <span className="note">(accepted range: 59 to 197 mmHg)</span>
          </label>
          <input
            type="number"
            value={sbp}
            onChange={(e) => setSbp(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>
            Alanine aminotransferase (ALT) at admission<br />
            <span className="note">(accepted range: 6 to 515 U/L)</span>
          </label>
          <input
            type="number"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>
            MELD-Na at admission<br />
            <span className="note">(accepted range: 6 to 40)</span>
          </label>
          <input
            type="number"
            value={meldNa}
            onChange={(e) => setMeldNa(e.target.value)}
          />
        </div>

        <button type="button" onClick={calculateRisk} className="calculate-btn">
          Calculate
        </button>
      </form>

      <div className="result">
        <strong>{result}</strong>
      </div>

      <p className="citation">
        This calculator is based on the manuscript by Bou Daher et al.<br />
        DOI: XXXXXXXXXXXX
      </p>

         <footer>
      <div className="footer-banner">
        <img src={logo} alt="Digestive Disease Research Center" />
        <div>
          <p className="footer-title-main">Digestive Disease Research Center</p>
          <p className="footer-title-sub">AT THE MEDICAL UNIVERSITY OF SOUTH CAROLINA</p>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default App;
