# KaveriAI — Karnataka State Police Crime Intelligence Platform

> **Datathon 2026 Submission | Intelligent Conversational AI for KSP Crime Database (SCRB)**

---

## 🌐 Live Deployment Links

- 🚀 **GitHub Pages Deployed App**: [https://ganu39.github.io/kaveriai/](https://ganu39.github.io/kaveriai/)
- 📦 **GitHub Repository**: [https://github.com/Ganu39/kaveriai](https://github.com/Ganu39/kaveriai)
- ☁️ **Zoho Catalyst Web Client**: Pre-configured & ready (`catalyst.json` included)

---

## 📌 Executive Summary

**KaveriAI** is a production-style, multi-agent conversational crime intelligence platform built for the **State Crime Records Bureau (SCRB), Karnataka State Police**. 

Instead of relying on static dashboards and manual SQL queries across 1,100+ police stations, KaveriAI empowers law enforcement officers, district commanders, and senior analysts to ask complex natural-language questions and receive **verified, explainable, data-backed answers with interactive visualizations, geospatial hotspot maps, and legal citations**.

---

## 🚀 Key Features

1. 🔐 **Role-Based Access Control (RBAC)**: Secure multi-tier authentication (`Police Officer`, `District Officer`, `Senior Crime Analyst`, `Senior Official`, `System Administrator`) with strict jurisdictional data isolation.
2. 🤖 **AI Multi-Agent Query Router**:
   - ⚡ **Natural Language → Text-to-SQL Agent**: Converts plain language queries to validated, read-only SQL with schema verification & injection prevention locks.
   - 📚 **RAG Knowledge Retrieval Agent**: Retrieves legal definitions (Bharatiya Nyaya Sanhita - BNS / IPC), FIR protocols, and standing police circulars with source citations.
   - 📊 **Analytics & Anomaly Engine**: Detects statistical crime anomalies using Z-score outlier detection and computes YoY growth rates across all 31 Karnataka districts.
   - 🗺️ **Geospatial Hotspot Agent**: Generates interactive Leaflet coordinate maps and density heatmaps for Karnataka's 31 districts and police station clusters.
3. 📄 **Automated PDF Briefing Generator**: Generates downloadable, confidential SCRB crime reports in one click.
4. 🛡️ **Audit Logging & Security**: Logs all user queries, role authorizations, and data access trails in real-time.

---

## 🏗️ System Architecture

```
                                  USER QUESTION
                                        │
                                        ▼
                         ┌─────────────────────────────┐
                         │   Role-Based Auth & RBAC   │
                         └──────────────┬──────────────┘
                                        │
                                        ▼
                         ┌─────────────────────────────┐
                         │  Multi-Agent Intent Router  │
                         └──────────────┬──────────────┘
                                        │
        ┌───────────────────┬───────────┴───────────┬───────────────────┐
        ▼                   ▼                       ▼                   ▼
┌──────────────┐    ┌──────────────┐        ┌──────────────┐    ┌──────────────┐
│  Text-to-SQL │    │ RAG Vector   │        │ Analytics &  │    │ Geospatial   │
│    Agent     │    │  Legal Search│        │  Z-Anomaly   │    │ Hotspot Map  │
└───────┬──────┘    └───────┬──────┘        └───────┬──────┘    └───────┬──────┘
        │                   │                       │                   │
        └───────────────────┼───────────────────────┴───────────────────┘
                            │
                            ▼
             ┌─────────────────────────────┐
             │ Verified Response Engine    │
             │ (Markdown + Charts + Map)   │
             └─────────────────────────────┘
```

---

## 🛠️ Tech Stack & Deployment

- **Frontend**: HTML5, Tailwind CSS, Lucide Icons, Chart.js, Leaflet JS, html2pdf
- **Backend / AI Engine**: JavaScript Multi-Agent Orchestrator + Gemini 2.0 Flash Integration API
- **Deployment**: GitHub Pages & **Zoho Catalyst (Web Client App Services)**

---

## ⚡ Quick Start (Local Run)

### Method 1: Instant Browser Launch
Simply open `client/index.html` directly in any web browser!

### Method 2: Node.js Serve
```bash
npx serve client
```
Access at `http://localhost:3000`.

---

## ☁️ Deployment on Zoho Catalyst (Step-by-Step Guide)

KaveriAI is configured out-of-the-box for **Zoho Catalyst Web Client** deployment!

### Step 1: Install Catalyst CLI
```bash
npm install -g zcatalyst-cli
```

### Step 2: Login to Zoho Catalyst
```bash
catalyst login
```

### Step 3: Initialize & Deploy
Inside the project root directory (`datathon/`):
```bash
catalyst deploy
```
Choose your Catalyst Project and deploy the **Web Client (`client/` folder)**.

Alternatively, you can compress the `client/` folder into a `.zip` file and upload it directly under **Zoho Catalyst Console → Web Client / Slate → Upload Build**.

---

## 📊 Covered Jurisdictions (31 Karnataka Districts)

KaveriAI indexes data for all 31 districts of Karnataka:
- **Metropolitan & Urban**: Bengaluru Urban, Mysuru, Hubballi-Dharwad, Belagavi, Kalaburagi, Mangaluru (Dakshina Kannada), Ballari.
- **Central & South**: Shivamogga, Tumakuru, Davanagere, Hassan, Mandya, Ramanagara, Chikkamagaluru, Chitradurga, Chamarajanagar, Kodagu.
- **North & Coastal**: Vijayapura, Udupi, Karwar (Uttara Kannada), Bidar, Raichur, Bagalkot, Gadag, Kolar, Koppal, Haveri, Chikkaballapura, Yadgir, Vijayanagara, Bengaluru Rural.

---

## 📜 License
Developed for **Datathon 2026**. Karnataka State Police (SCRB) Prototype.
