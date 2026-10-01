# 🛡️ AI-Based Network Vulnerability Scanner

An AI-powered network vulnerability scanner that automates **vulnerability detection, severity classification, and security report generation** using ethical hacking and cybersecurity tools.

## 📌 Overview

The **AI-Based Network Vulnerability Scanner** is designed to identify security weaknesses in authorized networks and web applications. It integrates tools such as **Nmap** and **OWASP ZAP** to collect security information and uses a **Random Forest classifier** to categorize detected vulnerabilities based on their severity.

The system provides a centralized dashboard and automatically generates security reports containing detected vulnerabilities, severity levels, and recommended mitigation measures.

> ⚠️ **Ethical Use:** This project must only be used on systems, networks, and applications for which you have explicit authorization to perform security testing.

## 🎯 Objectives

* Detect open ports and network services.
* Identify common network and web vulnerabilities.
* Classify vulnerabilities based on severity.
* Provide security recommendations.
* Automate vulnerability report generation.
* Provide a user-friendly security dashboard.

## ✨ Key Features

* 🔍 **Network Scanning** – Discover hosts, ports, and services using Nmap.
* 🌐 **Web Security Scanning** – Analyze authorized web applications using OWASP ZAP.
* 🤖 **AI-Based Classification** – Classify vulnerabilities using a Random Forest model.
* 📊 **Severity Analysis** – Categorize vulnerabilities as Low, Medium, or High.
* 📄 **Automated Reports** – Generate structured security reports.
* 🔐 **Authentication** – Secure user authentication and access control.
* 📈 **Dashboard** – Visualize scan results and vulnerability statistics.
* 💡 **Mitigation Suggestions** – Provide recommendations for detected issues.

## 🏗️ System Architecture

```text
                 ┌─────────────────────┐
                 │     User / Admin    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   React Dashboard   │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Node.js / Express │
                 │      Backend        │
                 └──────────┬──────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
      ┌──────────────┐             ┌──────────────┐
      │     Nmap     │             │  OWASP ZAP   │
      │ Network Scan │             │  Web Scan    │
      └──────┬───────┘             └──────┬───────┘
             │                            │
             └────────────┬───────────────┘
                          ▼
                 ┌─────────────────────┐
                 │ Vulnerability Data  │
                 │     Processing      │
                 └──────────┬──────────┘
                            ▼
                 ┌─────────────────────┐
                 │ Random Forest Model │
                 │ Severity Classifier │
                 └──────────┬──────────┘
                            ▼
                 ┌─────────────────────┐
                 │   MongoDB Database  │
                 └──────────┬──────────┘
                            ▼
                 ┌─────────────────────┐
                 │ Automated Security  │
                 │       Report        │
                 └─────────────────────┘
```

## 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Chart.js

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB

### AI / Machine Learning

* Python
* Scikit-learn
* Random Forest Classifier
* Pandas
* NumPy

### Security Tools

* Nmap
* OWASP ZAP
* Wireshark

### Operating System

* Kali Linux
* Ubuntu
* Windows with Kali Linux VM

## 📂 Project Structure

```text
AI-Network-Vulnerability-Scanner/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   ├── app.js
│   └── package.json
│
├── ml-model/
│   ├── dataset/
│   ├── train_model.py
│   ├── predict.py
│   ├── model.pkl
│   └── requirements.txt
│
├── scanner/
│   ├── nmap_scanner/
│   ├── zap_scanner/
│   └── scanner_service.py
│
├── reports/
│
├── docs/
│
├── README.md
└── .gitignore
```

## ⚙️ System Requirements

### Hardware

* Processor: Intel Core i5 or equivalent
* RAM: 8 GB or more
* Storage: 20 GB+ free space
* Network adapter

### Software

* Kali Linux / Ubuntu / Windows
* Node.js and npm
* Python 3.10+
* MongoDB
* Nmap
* OWASP ZAP
* Git
* Visual Studio Code

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nandanbhatkal03/vuln-scanner.git
cd vuln-scanner
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Install Python Dependencies

```bash
cd ../ml-model
pip install -r requirements.txt
```

Example `requirements.txt`:

```text
pandas
numpy
scikit-learn
joblib
```

### 5. Verify Security Tools

```bash
nmap --version
```

Verify OWASP ZAP installation according to your operating system.

### 6. Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/vulnerability_scanner
JWT_SECRET=your_secret_key
```

## ▶️ Running the Project

### Start Backend

```bash
cd backend
npm start
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The application will be available through the local development URL displayed by Vite.

## 🤖 AI Model

The project uses a **Random Forest Classifier** for vulnerability severity classification.

### Input Features

The model can use features such as:

* Port number
* Protocol
* Service type
* Port state
* Vulnerability type
* CVSS-related information
* Network/service characteristics

### Output

```text
Low
Medium
High
```

The AI model assists in prioritizing detected vulnerabilities and presenting the results in an understandable format.

## 🔍 Scanning Workflow

```text
Target Selection
       ↓
Network/Web Scan
       ↓
Data Collection
       ↓
Vulnerability Detection
       ↓
Feature Extraction
       ↓
AI Severity Classification
       ↓
Risk Analysis
       ↓
Mitigation Recommendations
       ↓
Automated Report
```

## 📄 Report Generation

The generated report contains:

* Scan information
* Target details
* Detected vulnerabilities
* Vulnerability type
* Severity level
* Evidence/details
* Risk description
* Recommended mitigation
* Scan timestamp

## 🔐 Security and Ethical Considerations

This project is intended strictly for **authorized security testing and educational purposes**.

Do not scan or test:

* Networks without permission
* Public infrastructure without authorization
* Third-party websites
* Systems belonging to other individuals or organizations

Recommended testing environments include:

* Your own local network
* Virtual machines
* Intentionally vulnerable applications
* CTF/lab environments

## 🧪 Recommended Testing Environment

For safe testing, use intentionally vulnerable applications such as:

* OWASP Juice Shop
* OWASP WebGoat
* Metasploitable

Run these applications in an isolated lab environment and scan only systems you are authorized to test.

## 📈 Future Enhancements

* Real-time network monitoring
* Intrusion detection integration
* Advanced ML/deep-learning models
* CVE database integration
* CVSS-based risk scoring
* Automated remediation recommendations
* Email-based security alerts
* Cloud deployment
* Docker containerization
* Continuous vulnerability monitoring

## 📚 Learning Resources

* Nmap documentation
* OWASP ZAP documentation
* OWASP Web Security Testing Guide
* Scikit-learn documentation
* MITRE ATT&CK
* CVE / NVD vulnerability databases

## 🎓 Course Relevance

This project supports the learning outcomes of **Network Security and Ethical Hacking** by covering:

| Course Outcome | Project Component                               |
| -------------- | ----------------------------------------------- |
| CO1            | Network and wireless security analysis          |
| CO2            | Secure communication and cybersecurity analysis |
| CO3            | Authentication and access control               |
| CO4            | Vulnerability and attack identification         |
| CO5            | Ethical hacking and security testing            |

## 👨‍💻 Project Status

**Status:** 🚧 Under Development

Features and implementation details may change as the project progresses.

## 📜 License

This project is intended for **academic and educational purposes**. Use all security scanning capabilities only on systems for which you have explicit authorization.

## ⭐ Acknowledgements

* Nmap Project
* OWASP
* Scikit-learn
* MongoDB
* React.js
* Node.js
* Kali Linux

---

**Developed as an academic project for Network Security and Ethical Hacking.**
