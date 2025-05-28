// ai-engine/suggestFeatures.js

const fs = require("fs");
const path = require("path");

const usageLogPath = path.join(__dirname, "../logs/usage.json");
const suggestionsLogPath = path.join(__dirname, "../logs/ai-suggestions.json");

// Load usage data
let usageData = [];
if (fs.existsSync(usageLogPath)) {
  usageData = JSON.parse(fs.readFileSync(usageLogPath, "utf8"));
}

// Example suggestion engine
const suggestions = [];

const totalRequests = usageData.length;
const requestsByType = usageData.reduce((acc, entry) => {
  const type = entry.category;
  acc[type] = (acc[type] || 0) + 1;
  return acc;
}, {});

// Suggest new module if certain category spikes
if ((requestsByType["fysiek bezoek"] || 0) > 20) {
  suggestions.push({
    id: "loopmaatje-feature",
    title: "Nieuwe functie: Loopmaatje-module",
    description: "Veel aanvragen voor fysieke bezoekhulp. Activeer een loopmaatje-functie voor wandelingen in de buurt.",
    action: "deployOptionalFeature('loopmaatjeModule')",
    status: "pending",
    timestamp: new Date().toISOString(),
  });
}

// Suggest realtime alerts if knopgebruik stijgt
if ((requestsByType["noodknop"] || 0) > 10) {
  suggestions.push({
    id: "realtime-alerts",
    title: "Realtime alerts activeren",
    description: "De fysieke knop wordt vaak gebruikt. Wilt u realtime meldingen inschakelen voor snellere opvolging?",
    action: "deployOptionalFeature('realtimeAlerts')",
    status: "pending",
    timestamp: new Date().toISOString(),
  });
}

// Save suggestions for review
fs.writeFileSync(suggestionsLogPath, JSON.stringify(suggestions, null, 2));

console.log("AI-suggesties bijgewerkt. Wacht op toestemming van beheerder...");
