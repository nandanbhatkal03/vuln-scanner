import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

function App() {
  const [target, setTarget] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await fetch('http://localhost:5000/history');
    const data = await res.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleScan = async () => {
    if (!target) {
      setError('Please enter a target IP');
      return;
    }
    setError('');
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch('http://localhost:5000/scan/ports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target })
      });
      const data = await response.json();
      setResults(data);
      fetchHistory();
    } catch (err) {
      setError('Could not connect to backend');
    }
    setLoading(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleString();

    doc.setFillColor(15, 110, 86);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('AI Network Vulnerability Report', 15, 18);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(`Target: ${results.target}`, 15, 40);
    doc.text(`Scan Date: ${date}`, 15, 48);
    doc.text(`Total Open Ports: ${results.ports.length}`, 15, 56);

    doc.setFillColor(15, 110, 86);
    doc.rect(0, 63, 210, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('Open Ports', 15, 69);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    let y = 80;

    results.ports.forEach((p, i) => {
      doc.setFillColor(i % 2 === 0 ? 240 : 255, 240, 240);
      doc.rect(10, y - 5, 190, 8, 'F');
      doc.setTextColor(0, 0, 0);
      doc.text(`Port ${p.port}`, 15, y);
      doc.text(p.protocol, 50, y);
      doc.text(p.state, 80, y);
      doc.text(p.service, 110, y);
      y += 10;
    });

    y += 10;
    doc.setFillColor(15, 110, 86);
    doc.rect(0, y - 5, 210, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('AI Security Analysis', 15, y + 1);

    y += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);

    const lines = results.analysis.split('\n');
    lines.forEach(line => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      if (line.includes('CRITICAL')) doc.setTextColor(200, 0, 0);
      else if (line.includes('HIGH')) doc.setTextColor(200, 100, 0);
      else if (line.includes('MEDIUM')) doc.setTextColor(180, 140, 0);
      else if (line.includes('✅')) doc.setTextColor(0, 150, 0);
      else if (line.includes('📊')) doc.setTextColor(0, 0, 200);
      else doc.setTextColor(0, 0, 0);

      doc.text(line, 15, y);
      y += 6;
    });

    doc.save(`vuln-report-${results.target}-${Date.now()}.pdf`);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '900px', margin: '0 auto' }}>

      <h1 style={{ color: '#0f6e56' }}>🛡️ AI Network Vulnerability Scanner</h1>
      <p style={{ color: '#666' }}>Powered by nmap + AI Analysis</p>

      <div style={{ marginBottom: '20px', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter target IP e.g. 127.0.0.1"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          style={{ padding: '10px', width: '300px', fontSize: '16px',
            borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleScan}
          style={{ padding: '10px 20px', marginLeft: '10px',
          background: '#0f6e56', color: 'white',
          border: 'none', fontSize: '16px', cursor: 'pointer', borderRadius: '5px' }}
        >
          {loading ? '⏳ Scanning...' : '🔍 Start Scan'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && (
        <div style={{ background: '#f0f0f0', padding: '15px',
          borderRadius: '8px', marginBottom: '20px' }}>
          <p>⏳ Running nmap scan and AI analysis... please wait</p>
        </div>
      )}

      {results && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>📊 Scan Results for {results.target}</h2>
            <button
              onClick={generatePDF}
              style={{ padding: '10px 20px',
              background: '#c0392b', color: 'white',
              border: 'none', fontSize: '14px',
              cursor: 'pointer', borderRadius: '5px' }}
            >
              📄 Download PDF Report
            </button>
          </div>

          <table border="1" cellPadding="10"
            style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px', marginTop: '15px' }}>
            <thead style={{ background: '#0f6e56', color: 'white' }}>
              <tr>
                <th>Port</th>
                <th>Protocol</th>
                <th>State</th>
                <th>Service</th>
              </tr>
            </thead>
            <tbody>
              {results.ports.map((p, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#f9f9f9' : 'white' }}>
                  <td>{p.port}</td>
                  <td>{p.protocol}</td>
                  <td style={{ color: 'green', fontWeight: 'bold' }}>{p.state}</td>
                  <td>{p.service}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {results.analysis && (
            <div style={{ background: '#1a1a2e', padding: '20px',
              borderRadius: '8px', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              <h3 style={{ color: '#00d4aa', marginBottom: '15px' }}>🤖 AI Security Analysis</h3>
              {results.analysis.split('\n').map((line, i) => {
                let color = '#c9d1d9';
                if (line.includes('CRITICAL')) color = '#ff4444';
                if (line.includes('HIGH')) color = '#ff8c00';
                if (line.includes('MEDIUM')) color = '#ffd700';
                if (line.includes('LOW')) color = '#00d4aa';
                if (line.includes('✅')) color = '#3fb950';
                if (line.includes('📊')) color = '#58a6ff';
                if (line.includes('⚡')) color = '#ff4444';
                return <div key={i} style={{ color, lineHeight: '1.8' }}>{line}</div>;
              })}
            </div>
          )}
        </div>
      )}

      <div>
        <h2>📋 Scan History</h2>
        {history.length === 0 ? (
          <p>No scans yet</p>
        ) : (
          history.map((scan, i) => (
            <div key={i} style={{ marginBottom: '10px',
              border: '1px solid #ccc', padding: '15px',
              borderRadius: '8px', background: '#f9f9f9' }}>
              <p><strong>🎯 Target:</strong> {scan.target}</p>
              <p><strong>🕐 Time:</strong> {new Date(scan.createdAt).toLocaleString()}</p>
              <p><strong>🔓 Open Ports:</strong> {scan.ports.map(p => p.port).join(', ')}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default App;
