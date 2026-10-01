const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const mongoose = require('mongoose');
const Scan = require('./models/Scan');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/vulnscanner')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

function parseNmap(rawOutput) {
  const lines = rawOutput.split('\n');
  const ports = [];
  lines.forEach(line => {
    const match = line.match(/^(\d+)\/(tcp|udp)\s+(\w+)\s+(\S+)\s*(.*)/);
    if (match) {
      ports.push({
        port: match[1],
        protocol: match[2],
        state: match[3],
        service: match[4],
        version: match[5] || ''
      });
    }
  });
  return ports;
}

const riskDB = {
  '21':   { severity: 'CRITICAL', risk: 'FTP transfers files and credentials in plain text. Attackers can intercept data using packet sniffing.', fix: 'Disable FTP. Use SFTP or SCP for secure file transfers.' },
  '22':   { severity: 'MEDIUM',   risk: 'SSH is open. Vulnerable to brute force attacks if weak passwords are used.', fix: 'Use SSH key authentication. Disable password login and root access.' },
  '23':   { severity: 'CRITICAL', risk: 'Telnet sends all data including passwords in plain text. Extremely dangerous on any network.', fix: 'Disable Telnet immediately. Replace with SSH for remote access.' },
  '80':   { severity: 'HIGH',     risk: 'HTTP traffic is unencrypted. Vulnerable to XSS, SQL injection and man-in-the-middle attacks.', fix: 'Use HTTPS with SSL/TLS certificate. Redirect all HTTP to HTTPS.' },
  '443':  { severity: 'LOW',      risk: 'HTTPS is running. Check for outdated TLS versions and weak cipher suites.', fix: 'Ensure TLS 1.2 or higher. Disable SSL 3.0, TLS 1.0 and TLS 1.1.' },
  '3000': { severity: 'MEDIUM',   risk: 'Development server port is exposed. No security hardening in development mode.', fix: 'Never expose port 3000 in production. Use port 80 with reverse proxy.' },
  '3306': { severity: 'CRITICAL', risk: 'MySQL database port is exposed to network. Attacker can access or destroy entire database.', fix: 'Restrict MySQL to localhost only. Block port 3306 in firewall.' },
  '5000': { severity: 'MEDIUM',   risk: 'Backend API port is publicly accessible. Unauthorized API access possible.', fix: 'Add JWT authentication to all routes. Use firewall to restrict access.' },
  '8080': { severity: 'HIGH',     risk: 'Alternative HTTP port open. Often runs without HTTPS or authentication.', fix: 'Close port 8080 in production. Use port 443 with HTTPS instead.' },
};

function generateAnalysis(ports) {
  let report = '🤖 AI Security Analysis Report\n';
  report += '================================\n\n';

  let critical = 0, high = 0, medium = 0;

  ports.forEach(p => {
    const info = riskDB[p.port];
    if (info) {
      if (info.severity === 'CRITICAL') critical++;
      if (info.severity === 'HIGH') high++;
      if (info.severity === 'MEDIUM') medium++;

      report += `📌 Port ${p.port} (${p.service.toUpperCase()}) — ${info.severity} RISK\n`;
      report += `   ⚠️  Risk : ${info.risk}\n`;
      report += `   ✅ Fix  : ${info.fix}\n\n`;
    } else {
      report += `📌 Port ${p.port} (${p.service}) — UNKNOWN\n`;
      report += `   ⚠️  Risk : Unknown service exposed to network.\n`;
      report += `   ✅ Fix  : Investigate and close if not needed.\n\n`;
    }
  });

  report += '================================\n';
  report += `📊 Summary: ${critical} Critical | ${high} High | ${medium} Medium\n`;
  report += '⚡ Immediate action required on CRITICAL ports!';

  return report;
}

app.get('/', (req, res) => {
  res.json({ message: 'Vuln Scanner backend is running' });
});

app.post('/scan/ports', async (req, res) => {
  const { target } = req.body;
  if (!target) {
    return res.status(400).json({ error: 'No target provided' });
  }

  const command = `nmap -T4 --open -p 21,22,23,80,3306,8080,5000,3000 --host-timeout 30s ${target}`;

  exec(command, { timeout: 35000 }, async (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }
    const ports = parseNmap(stdout);
    const analysis = generateAnalysis(ports);
    const scan = new Scan({ target, ports });
    await scan.save();
    res.json({ target, ports, analysis, raw: stdout });
  });
});

app.get('/history', async (req, res) => {
  const scans = await Scan.find().sort({ createdAt: -1 });
  res.json(scans);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
