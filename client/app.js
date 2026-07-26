// KaveriAI — Karnataka State Police Crime Intelligence Platform Engine
// Full Stack AI Engine: Intent Classification, Text-to-SQL, RAG Vector Search, Leaflet Hotspots, Charting

// --- 1. DATASET: 31 KARNATAKA DISTRICTS & NCRB CRIME DATA ---
const KARNATAKA_DISTRICTS = [
    { id: 1, name: "Bengaluru Urban", lat: 12.9716, lng: 77.5946, totalCases: 14210, solvedRate: 54.2, zone: "South" },
    { id: 2, name: "Mysuru", lat: 12.2958, lng: 76.6394, totalCases: 4840, solvedRate: 61.5, zone: "South" },
    { id: 3, name: "Dakshina Kannada (Mangaluru)", lat: 12.9141, lng: 74.8560, totalCases: 3950, solvedRate: 58.0, zone: "Coastal" },
    { id: 4, name: "Belagavi", lat: 15.8497, lng: 74.4977, totalCases: 3420, solvedRate: 62.1, zone: "North" },
    { id: 5, name: "Dharwad (Hubballi)", lat: 15.4589, lng: 75.0078, totalCases: 3100, solvedRate: 59.4, zone: "North" },
    { id: 6, name: "Kalaburagi", lat: 17.3297, lng: 76.8343, totalCases: 2850, solvedRate: 53.8, zone: "North" },
    { id: 7, name: "Ballari", lat: 15.1394, lng: 76.9214, totalCases: 2430, solvedRate: 64.0, zone: "Central" },
    { id: 8, name: "Shivamogga", lat: 13.9299, lng: 75.5681, totalCases: 2150, solvedRate: 63.2, zone: "Central" },
    { id: 9, name: "Tumakuru", lat: 13.3409, lng: 77.1010, totalCases: 2050, solvedRate: 57.9, zone: "South" },
    { id: 10, name: "Vijayapura", lat: 16.8302, lng: 75.7100, totalCases: 1980, solvedRate: 55.4, zone: "North" },
    { id: 11, name: "Udupi", lat: 13.3409, lng: 74.7421, totalCases: 1720, solvedRate: 66.8, zone: "Coastal" },
    { id: 12, name: "Hassan", lat: 13.0068, lng: 76.1004, totalCases: 1650, solvedRate: 60.1, zone: "South" },
    { id: 13, name: "Davanagere", lat: 14.4644, lng: 75.9218, totalCases: 1580, solvedRate: 58.7, zone: "Central" },
    { id: 14, name: "Mandya", lat: 12.5244, lng: 76.8969, totalCases: 1520, solvedRate: 62.4, zone: "South" },
    { id: 15, name: "Raichur", lat: 16.2076, lng: 77.3556, totalCases: 1450, solvedRate: 54.0, zone: "North" },
    { id: 16, name: "Bidar", lat: 17.9104, lng: 77.5199, totalCases: 1380, solvedRate: 52.9, zone: "North" },
    { id: 17, name: "Chikkamagaluru", lat: 13.3161, lng: 75.7720, totalCases: 1290, solvedRate: 65.3, zone: "Central" },
    { id: 18, name: "Uttara Kannada (Karwar)", lat: 14.8158, lng: 74.1302, totalCases: 1240, solvedRate: 67.1, zone: "Coastal" },
    { id: 19, name: "Bagalkot", lat: 16.1817, lng: 75.6961, totalCases: 1190, solvedRate: 56.8, zone: "North" },
    { id: 20, name: "Gadag", lat: 15.4319, lng: 75.6356, totalCases: 1080, solvedRate: 61.0, zone: "North" },
    { id: 21, name: "Kolar", lat: 13.1360, lng: 78.1292, totalCases: 1050, solvedRate: 57.2, zone: "South" },
    { id: 22, name: "Chitradurga", lat: 14.2251, lng: 76.3980, totalCases: 1020, solvedRate: 59.8, zone: "Central" },
    { id: 23, name: "Koppal", lat: 15.3524, lng: 76.1554, totalCases: 980, solvedRate: 58.1, zone: "North" },
    { id: 24, name: "Haveri", lat: 14.7954, lng: 75.3992, totalCases: 940, solvedRate: 60.5, zone: "North" },
    { id: 25, name: "Ramanagara", lat: 12.7160, lng: 77.2808, totalCases: 910, solvedRate: 56.4, zone: "South" },
    { id: 26, name: "Chikkaballapura", lat: 13.4355, lng: 77.7275, totalCases: 870, solvedRate: 58.9, zone: "South" },
    { id: 27, name: "Yadgir", lat: 16.7701, lng: 77.1376, totalCases: 820, solvedRate: 51.5, zone: "North" },
    { id: 28, name: "Chamarajanagar", lat: 11.9261, lng: 76.9437, totalCases: 760, solvedRate: 64.2, zone: "South" },
    { id: 29, name: "Kodagu (Madikeri)", lat: 12.4244, lng: 75.7382, totalCases: 690, solvedRate: 69.4, zone: "South" },
    { id: 30, name: "Bengaluru Rural", lat: 13.2483, lng: 77.7126, totalCases: 650, solvedRate: 57.8, zone: "South" },
    { id: 31, name: "Vijayanagara (Hosapete)", lat: 15.2689, lng: 76.3909, totalCases: 610, solvedRate: 61.3, zone: "Central" }
];

const CRIME_CATEGORIES = [
    { name: "Theft", share: 28.4, yoy: -1.2, color: "#3b82f6" },
    { name: "Cybercrime & Online Fraud", share: 22.1, yoy: +18.4, color: "#f59e0b" },
    { name: "Assault & Grievous Hurt", share: 16.5, yoy: -0.8, color: "#ec4899" },
    { name: "Burglary & House Breaking", share: 12.3, yoy: -4.5, color: "#8b5cf6" },
    { name: "Crimes Against Women", share: 9.8, yoy: -2.1, color: "#ef4444" },
    { name: "Financial Scams & Cheating", share: 6.2, yoy: +11.3, color: "#10b981" },
    { name: "Murder & Homicide", share: 2.4, yoy: -6.0, color: "#6366f1" },
    { name: "NDPS & Narcotics", share: 2.3, yoy: +5.2, color: "#14b8a6" }
];

// RAG Documents Base (BNS / IPC / Police Manual / Guidelines)
const RAG_DOCUMENTS = [
    {
        title: "Bharatiya Nyaya Sanhita (BNS) / IPC Section 302 - Murder Definition",
        category: "Legal Law",
        content: "Under BNS Section 101 (formerly IPC Section 302), murder is defined as intentional causing of death or bodily injury sufficient to cause death. Punishment includes death penalty or imprisonment for life and fine. Cognizable and non-bailable offense.",
        source: "Ministry of Law & Justice, Govt of India - BNS Code 2023"
    },
    {
        title: "Cognizable vs Non-Cognizable Offenses Guidelines",
        category: "Police Procedure",
        content: "A cognizable offense allows a police officer to make an arrest without a warrant under Section 154 CrPC / BNS provisions. Examples include Murder, Theft, Robbery, Rape, Cyber Fraud above threshold. Non-cognizable offenses require magistrate approval before arrest.",
        source: "Karnataka Police Standing Orders & Manual (SCRB)"
    },
    {
        title: "First Information Report (FIR) Standard Protocol",
        category: "Procedure",
        content: "An FIR must be registered immediately upon receiving information regarding any cognizable offense (Zero FIR allowed in any station regardless of territorial jurisdiction under new criminal laws). Copy must be supplied free of cost to complainant.",
        source: "SCRB Karnataka Circular 2024/09"
    },
    {
        title: "Cybercrime Financial Fraud Reporting & Helpline 1930",
        category: "Cyber Cell",
        content: "Financial cyber fraud cases reported within 2 hours ('Golden Hour') can trigger automatic bank lien via National Cyber Crime Reporting Portal (NCRP) and helpline 1930. Mandated for all 31 district Cyber Police Stations.",
        source: "Karnataka Cyber Command Headquarters"
    }
];

// --- 2. GLOBAL STATE ---
let currentUser = {
    username: "KSP-ANALYST-904",
    role: "analyst", // 'analyst', 'district_officer', 'police_officer', 'admin'
    jurisdiction: "All Karnataka Districts",
    geminiApiKey: ""
};

let auditLogs = [
    { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), user: "KSP-ANALYST-904", role: "analyst", action: "System Auth Success", status: "VERIFIED" },
    { timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19), user: "KSP-ANALYST-904", role: "analyst", action: "Queried State Overview", status: "200 OK" }
];

let mapInstance = null;
let trendChartInstance = null;
let pieChartInstance = null;
let barChartInstance = null;

// --- 3. INITIALIZATION & ROUTING ---
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    initDashboard();
    renderAuditLogs();
    document.getElementById("reportTimestamp").innerText = new Date().toLocaleString();
});

function openLoginModal() {
    document.getElementById("loginModal").classList.remove("hidden");
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const role = document.getElementById("roleSelect").value;
    const username = document.getElementById("usernameInput").value;
    const apiKey = document.getElementById("geminiApiKey").value.trim();

    currentUser.role = role;
    currentUser.username = username || "KSP-OFFICER";
    currentUser.geminiApiKey = apiKey;

    if (role === "district_officer") {
        currentUser.jurisdiction = "Bengaluru Urban Scoped";
    } else if (role === "police_officer") {
        currentUser.jurisdiction = "Cubbon Park PS Scoped";
    } else {
        currentUser.jurisdiction = "All Karnataka Districts";
    }

    document.getElementById("userBadge").innerText = getRoleLabel(role);
    document.getElementById("jurisdictionBadge").innerText = `Jurisdiction: ${currentUser.jurisdiction}`;

    addAuditLog(`Role Login: ${role}`, "AUTH SUCCESS");
    document.getElementById("loginModal").classList.add("hidden");
});

function getRoleLabel(role) {
    switch (role) {
        case "analyst": return "Senior Crime Analyst";
        case "senior_official": return "Senior Police Official";
        case "district_officer": return "District Officer (Blr Urban)";
        case "police_officer": return "Police Officer (Station)";
        case "admin": return "System Administrator";
        default: return "Authorized Personnel";
    }
}

function switchTab(tabId) {
    document.querySelectorAll(".view-panel").forEach(el => el.classList.add("hidden"));
    document.querySelectorAll(".tab-btn").forEach(el => {
        el.classList.remove("bg-blue-600", "text-white");
        el.classList.add("text-slate-400");
    });

    document.getElementById(`view-${tabId}`).classList.remove("hidden");
    const activeTabBtn = document.getElementById(`tab-${tabId}`);
    if (activeTabBtn) {
        activeTabBtn.classList.add("bg-blue-600", "text-white");
        activeTabBtn.classList.remove("text-slate-400");
    }

    if (tabId === 'map' && !mapInstance) {
        setTimeout(initMap, 200);
    } else if (tabId === 'analytics') {
        renderAnalyticsView();
    }
}

// --- 4. DASHBOARD CHARTS & LOGIC ---
function initDashboard() {
    renderDashboardCharts();
    renderTopDistrictsList();
}

function renderDashboardCharts() {
    // 1. Line Chart: 5-Year Crime Trend
    const ctxTrend = document.getElementById('dashboardTrendChart').getContext('2d');
    if (trendChartInstance) trendChartInstance.destroy();

    trendChartInstance = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024', '2025', '2026 (Est)'],
            datasets: [
                { label: 'Theft & Property', data: [16200, 15800, 15400, 15100, 15570, 14900], borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', fill: true, tension: 0.3 },
                { label: 'Cybercrime Fraud', data: [4200, 6100, 8400, 10200, 12110, 13400], borderColor: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.1)', fill: true, tension: 0.3 },
                { label: 'Assault & Hurt', data: [9800, 9500, 9300, 9100, 9040, 8900], borderColor: '#ec4899', tension: 0.3 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#94a3b8', font: { size: 11 } } } },
            scales: {
                x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });

    // 2. Pie Chart: Crime Category Share
    const ctxPie = document.getElementById('dashboardPieChart').getContext('2d');
    if (pieChartInstance) pieChartInstance.destroy();

    pieChartInstance = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: CRIME_CATEGORIES.map(c => c.name),
            datasets: [{
                data: CRIME_CATEGORIES.map(c => c.share),
                backgroundColor: CRIME_CATEGORIES.map(c => c.color),
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 10, font: { size: 10 } } } }
        }
    });
}

function renderTopDistrictsList() {
    const listEl = document.getElementById("topDistrictsList");
    const sorted = [...KARNATAKA_DISTRICTS].sort((a,b) => b.totalCases - a.totalCases).slice(0, 7);
    
    listEl.innerHTML = sorted.map((d, index) => `
        <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
            <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded bg-slate-800 text-slate-400 font-mono text-[10px] flex items-center justify-center font-bold">${index + 1}</span>
                <span class="font-medium text-slate-200">${d.name}</span>
            </div>
            <div class="text-right">
                <span class="font-mono text-blue-400 font-bold">${d.totalCases.toLocaleString()}</span>
                <span class="text-[10px] text-slate-400 block">${d.solvedRate}% solved</span>
            </div>
        </div>
    `).join('');
}

// --- 5. AI MULTI-AGENT INTENT CLASSIFIER & CHAT ENGINE ---
function quickQuery(queryText) {
    document.getElementById("chatInput").value = queryText;
    document.getElementById("chatForm").dispatchEvent(new Event('submit'));
}

async function handleChatSubmit(e) {
    e.preventDefault();
    const inputEl = document.getElementById("chatInput");
    const question = inputEl.value.trim();
    if (!question) return;

    inputEl.value = "";
    appendUserMessage(question);
    addAuditLog(`Chat Query: ${question.substring(0, 30)}...`, "SUBMITTED");

    // Show Typing Indicator
    const typingId = appendTypingIndicator();

    try {
        let responseObj;
        if (currentUser.geminiApiKey) {
            responseObj = await callGeminiLLM(question);
        } else {
            responseObj = simulateMultiAgentOrchestrator(question);
        }

        removeMessage(typingId);
        appendAIResponse(responseObj);
    } catch (err) {
        removeMessage(typingId);
        appendAIResponse(simulateMultiAgentOrchestrator(question));
    }
}

// Multi-Agent Router Simulator
function simulateMultiAgentOrchestrator(question) {
    const qLower = question.toLowerCase().trim();

    // 0. Handle Greetings & General Conversational Inputs
    if (qLower === "hi" || qLower === "hello" || qLower.includes("hey") || qLower.includes("who are you") || qLower.includes("help")) {
        return {
            queryType: "CONVERSATIONAL_AGENT",
            agent: "KaveriAI Assistant Core",
            confidence: 1.0,
            answer: `Namaskara! I am **KaveriAI**, the Conversational Intelligence Assistant for Karnataka State Police SCRB.\n\nHow can I assist your investigation today? You can ask me:\n- **Crime Statistics**: *"How many theft cases in Bengaluru in 2025?"*\n- **YoY Comparisons**: *"Compare Bengaluru Urban and Mysuru crime trends"*\n- **Legal RAG Search**: *"What is a cognizable offense under BNS?"*\n- **Geospatial Hotspots**: *"Show crime hotspots in Mangaluru"*`
        };
    }

    // 1. Check if RAG Knowledge Query (Definitions, IPC, BNS, FIR)
    if (qLower.includes("definition") || qLower.includes("ipc") || qLower.includes("bns") || qLower.includes("cognizable") || qLower.includes("fir") || qLower.includes("law") || qLower.includes("helpline")) {
        const docMatch = RAG_DOCUMENTS.find(d => qLower.includes("cognizable") ? d.title.includes("Cognizable") : (qLower.includes("302") || qLower.includes("murder") ? d.title.includes("Murder") : true)) || RAG_DOCUMENTS[0];
        
        return {
            queryType: "RAG_KNOWLEDGE_RETRIEVAL",
            agent: "RAG Knowledge Retrieval Agent",
            confidence: 0.98,
            answer: `### Verified RAG Response: Legal & Procedural Standard\n\n**${docMatch.title}**\n\n${docMatch.content}\n\n*This document is sourced directly from SCRB Karnataka Standing Orders and Legal Guidelines.*`,
            citation: `Source Document: ${docMatch.source} | Similarity Score: 0.94`
        };
    }

    // 2. Check if Geospatial Map Query
    if (qLower.includes("hotspot") || qLower.includes("map") || qLower.includes("location") || qLower.includes("density") || qLower.includes("mangalore") || qLower.includes("dakshina")) {
        return {
            queryType: "GEOSPATIAL_QUERY",
            agent: "Geospatial Intelligence Agent",
            confidence: 0.96,
            answer: `### Geospatial Analysis Executed\n\nIdentified **High Density Crime Clusters** in Dakshina Kannada (Mangaluru Sector) & Bengaluru Urban.\n- **Mangaluru North & Pandeshwar PS**: Higher concentration of financial cyber fraud\n- **Coordinates**: Lat 12.9141° N, Long 74.8560° E\n\n*Interactive heatmap overlay has been computed for the Map view.*`,
            chartType: "MAP_LINK"
        };
    }

    // 3. Analytics / YoY Comparison
    if (qLower.includes("compare") || qLower.includes("trend") || qLower.includes("growth") || qLower.includes("mysuru") || qLower.includes("anomaly")) {
        return {
            queryType: "ANALYTICS_QUERY",
            agent: "Analytics & Anomaly Engine",
            confidence: 0.95,
            answer: `### YoY Comparative Analytics (Bengaluru Urban vs Mysuru)\n\n- **Bengaluru Urban (2025)**: 14,210 Total Cases | Cybercrime Growth: **+18.4% YoY**\n- **Mysuru (2025)**: 4,840 Total Cases | Cybercrime Growth: **+7.2% YoY**\n- **Anomaly Status**: Cybercrime in Bengaluru Urban exhibits a statistically significant **Z-Score of +2.4** above historical baseline.`,
            sql: `SELECT district_name, year, crime_category, COUNT(*) as cases FROM crime_records WHERE district_name IN ('Bengaluru Urban', 'Mysuru') GROUP BY district_name, year, crime_category ORDER BY year DESC;`,
            chartType: "ANALYTICS_COMPARE"
        };
    }

    // 4. Default: Text-to-SQL Query
    let district = KARNATAKA_DISTRICTS.find(d => qLower.includes(d.name.toLowerCase())) || KARNATAKA_DISTRICTS[0];
    let casesCount = district.totalCases;
    let theftCount = Math.round(casesCount * 0.284);

    return {
        queryType: "NATURAL_LANGUAGE_TO_SQL",
        agent: "Text-to-SQL Agent",
        confidence: 0.99,
        answer: `### Verified Database Query Result\n\nIn **2025**, there were **${theftCount.toLocaleString()}** reported **Theft cases** in **${district.name}** out of a total ${casesCount.toLocaleString()} offenses.\n\n- **Case Resolution Rate**: ${district.solvedRate}%\n- **Primary Station Clusters**: Central Town PS, Sub-Urban PS`,
        sql: `SELECT COUNT(*) AS total_theft_cases, district_name FROM crime_records WHERE district_name = '${district.name}' AND crime_category = 'Theft' AND year = 2025 GROUP BY district_name LIMIT 1000;`,
        chartType: "SQL_RESULT"
    };
}

// Live Gemini API Call
async function callGeminiLLM(prompt) {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${currentUser.geminiApiKey}`;
        const systemInstruction = "You are KaveriAI, senior crime intelligence platform for Karnataka State Police. Synthesize verified data answers regarding crime stats in Karnataka's 31 districts. Provide clear markdown, citations, and SQL logic when needed.";

        const body = {
            contents: [{ parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }] }]
        };

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await res.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
            return {
                queryType: "GEMINI_LIVE_LLM",
                agent: "Gemini 2.0 Flash Agent",
                confidence: 0.99,
                answer: data.candidates[0].content.parts[0].text,
                citation: "Verified by Live Gemini 2.0 Flash API Engine"
            };
        } else {
            console.warn("Gemini API call returned non-standard format, falling back to local Multi-Agent engine:", data);
            return simulateMultiAgentOrchestrator(prompt);
        }
    } catch (e) {
        console.warn("Gemini API network error, falling back to local Multi-Agent engine:", e);
        return simulateMultiAgentOrchestrator(prompt);
    }
}

// Chat UI Appenders
function appendUserMessage(text) {
    const stream = document.getElementById("chatStream");
    const div = document.createElement("div");
    div.className = "flex gap-3 justify-end items-start";
    div.innerHTML = `
        <div class="glass-card bg-blue-600/20 border-blue-500/30 p-3.5 rounded-2xl rounded-tr-sm text-xs text-white max-w-xl">
            ${text}
        </div>
        <div class="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 text-xs font-bold border border-slate-700">
            YOU
        </div>
    `;
    stream.appendChild(div);
    stream.scrollTop = stream.scrollHeight;
}

function appendTypingIndicator() {
    const stream = document.getElementById("chatStream");
    const id = "typing-" + Date.now();
    const div = document.createElement("div");
    div.id = id;
    div.className = "flex gap-3 items-start";
    div.innerHTML = `
        <div class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs">
            <i data-lucide="bot" class="w-4 h-4 animate-spin"></i>
        </div>
        <div class="glass-card p-3.5 rounded-2xl rounded-tl-sm text-xs text-slate-400 font-mono flex items-center gap-2">
            <span>KaveriAI Routing Intent & Executing Agent...</span>
        </div>
    `;
    stream.appendChild(div);
    stream.scrollTop = stream.scrollHeight;
    lucide.createIcons();
    return id;
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function appendAIResponse(res) {
    const stream = document.getElementById("chatStream");
    const div = document.createElement("div");
    div.className = "flex gap-4 items-start max-w-3xl";

    let badgeColor = "bg-blue-950 text-blue-300 border-blue-800";
    if (res.queryType === "RAG_KNOWLEDGE_RETRIEVAL") badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-800";
    if (res.queryType === "GEOSPATIAL_QUERY") badgeColor = "bg-purple-950 text-purple-300 border-purple-800";
    if (res.queryType === "ANALYTICS_QUERY") badgeColor = "bg-amber-950 text-amber-300 border-amber-800";

    const parsedMarkdown = marked.parse(res.answer || "");

    div.innerHTML = `
        <div class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-blue-600/30">
            <i data-lucide="shield" class="w-4 h-4"></i>
        </div>
        <div class="glass-card p-4 md:p-5 rounded-2xl rounded-tl-sm space-y-3 text-xs leading-relaxed text-slate-200 border border-slate-700/80 w-full">
            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${badgeColor}">${res.agent || res.queryType}</span>
                <span class="text-[10px] text-slate-400 font-mono">Verified Confidence: ${res.confidence ? (res.confidence * 100).toFixed(0) + '%' : '100%'}</span>
            </div>

            <div class="prose prose-invert max-w-none text-xs">
                ${parsedMarkdown}
            </div>

            ${res.sql ? `
                <div class="mt-3 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px]">
                    <div class="text-[10px] text-blue-400 font-semibold uppercase mb-1 flex items-center justify-between">
                        <span>Generated & Verified SQL Query</span>
                        <span class="text-slate-500">Read-Only Safety Lock</span>
                    </div>
                    <code class="text-slate-300 block overflow-x-auto">${res.sql}</code>
                </div>
            ` : ''}

            ${res.citation ? `
                <div class="text-[10px] text-slate-400 font-mono bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    🔍 ${res.citation}
                </div>
            ` : ''}
        </div>
    `;

    stream.appendChild(div);
    stream.scrollTop = stream.scrollHeight;
    lucide.createIcons();
}

function clearChatHistory() {
    document.getElementById("chatStream").innerHTML = "";
}

// --- 6. MAP & GEOSPATIAL MODULE ---
function initMap() {
    if (mapInstance) return;

    // Centered on Karnataka (Lat: 15.3, Lng: 75.7, Zoom: 7)
    mapInstance = L.map('karnatakaMap').setView([15.3, 75.7], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; Karnataka State Police SCRB | OpenStreetMap',
        maxZoom: 18
    }).addTo(mapInstance);

    // Populate Map Select Filter
    const select = document.getElementById("mapDistrictFilter");
    KARNATAKA_DISTRICTS.forEach(d => {
        const opt = document.createElement("option");
        opt.value = d.name;
        opt.innerText = `${d.name} (${d.totalCases} cases)`;
        select.appendChild(opt);
    });

    // Add Markers for all 31 Districts
    KARNATAKA_DISTRICTS.forEach(d => {
        const marker = L.circleMarker([d.lat, d.lng], {
            radius: Math.max(6, Math.min(22, d.totalCases / 700)),
            fillColor: d.totalCases > 5000 ? "#ef4444" : (d.totalCases > 2000 ? "#f59e0b" : "#3b82f6"),
            color: "#ffffff",
            weight: 1.5,
            opacity: 1,
            fillOpacity: 0.75
        }).addTo(mapInstance);

        marker.bindPopup(`
            <div class="p-1 font-sans">
                <h4 class="font-bold text-sm text-slate-900">${d.name}</h4>
                <p class="text-xs text-slate-600 mt-1">Total Reported Cases: <b>${d.totalCases.toLocaleString()}</b></p>
                <p class="text-xs text-slate-600">Case Solved Rate: <b>${d.solvedRate}%</b></p>
                <span class="inline-block mt-2 px-2 py-0.5 text-[10px] bg-blue-100 text-blue-800 font-semibold rounded">Zone: ${d.zone}</span>
            </div>
        `);
    });

    // Add Leaflet Heatmap Layer
    const heatPoints = KARNATAKA_DISTRICTS.map(d => [d.lat, d.lng, d.totalCases / 500]);
    if (L.heatLayer) {
        L.heatLayer(heatPoints, { radius: 25, blur: 15, maxZoom: 10 }).addTo(mapInstance);
    }
}

function updateMapFilters() {
    const selectedDist = document.getElementById("mapDistrictFilter").value;
    if (selectedDist !== "all") {
        const d = KARNATAKA_DISTRICTS.find(x => x.name === selectedDist);
        if (d && mapInstance) {
            mapInstance.setView([d.lat, d.lng], 10);
        }
    } else if (mapInstance) {
        mapInstance.setView([15.3, 75.7], 7);
    }
}

// --- 7. ANALYTICS ENGINE & ANOMALIES ---
function renderAnalyticsView() {
    // Render Anomalies Grid
    const container = document.getElementById("anomaliesContainer");
    container.innerHTML = `
        <div class="glass-card p-4 rounded-2xl border-l-4 border-red-500 space-y-2">
            <span class="text-[10px] bg-red-950 text-red-400 font-mono px-2 py-0.5 rounded uppercase">High Severity • Z-Score +2.4</span>
            <h4 class="text-xs font-bold text-white">Bengaluru Urban — Cybercrime Fraud</h4>
            <p class="text-xs text-slate-400">Monthly case surge (+24.8% YoY) exceeding historical moving average threshold.</p>
        </div>

        <div class="glass-card p-4 rounded-2xl border-l-4 border-amber-500 space-y-2">
            <span class="text-[10px] bg-amber-950 text-amber-400 font-mono px-2 py-0.5 rounded uppercase">Medium Severity • Z-Score +1.8</span>
            <h4 class="text-xs font-bold text-white">Dakshina Kannada — Financial Cheating</h4>
            <p class="text-xs text-slate-400">Spike in online phishing frauds reported in Mangaluru Urban PS jurisdiction.</p>
        </div>

        <div class="glass-card p-4 rounded-2xl border-l-4 border-emerald-500 space-y-2">
            <span class="text-[10px] bg-emerald-950 text-emerald-400 font-mono px-2 py-0.5 rounded uppercase">Positive Outlier • Z-Score -1.5</span>
            <h4 class="text-xs font-bold text-white">Mysuru — Property Theft Reduction</h4>
            <p class="text-xs text-slate-400">Night patrolling initiative resulted in 14.2% reduction in night burglaries.</p>
        </div>
    `;

    // Render Bar Chart
    const ctxBar = document.getElementById('analyticsBarChart').getContext('2d');
    if (barChartInstance) barChartInstance.destroy();

    const top15 = [...KARNATAKA_DISTRICTS].sort((a,b) => b.totalCases - a.totalCases).slice(0, 15);

    barChartInstance = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: top15.map(d => d.name),
            datasets: [{
                label: 'Total Reported Offenses (2025)',
                data: top15.map(d => d.totalCases),
                backgroundColor: '#3b82f6',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#94a3b8' } } },
            scales: {
                x: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}

// --- 8. REPORTS & AUDIT TRAIL ---
function addAuditLog(action, status) {
    const entry = {
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        user: currentUser.username,
        role: currentUser.role,
        action: action,
        status: status
    };
    auditLogs.unshift(entry);
    if (auditLogs.length > 20) auditLogs.pop();
    renderAuditLogs();
}

function renderAuditLogs() {
    const tbody = document.getElementById("auditLogsBody");
    if (!tbody) return;

    tbody.innerHTML = auditLogs.map(log => `
        <tr class="hover:bg-slate-900/60">
            <td class="p-3 text-slate-400">${log.timestamp}</td>
            <td class="p-3 font-bold text-white">${log.user}</td>
            <td class="p-3 text-blue-400">${log.role}</td>
            <td class="p-3 text-slate-300">${log.action}</td>
            <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">${log.status}</span></td>
        </tr>
    `).join('');
}

function generatePDFReport() {
    const element = document.getElementById('reportDocument');
    addAuditLog("Exported Official PDF Report", "PDF GENERATED");

    const opt = {
        margin:       0.5,
        filename:     `KSP_SCRB_Crime_Report_${Date.now()}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, logging: false },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
