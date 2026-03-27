const cropData = [
  {
    name: "Rice",
    soils: ["Clay", "Loamy"],
    tempMin: 20,
    tempMax: 35,
    rainMin: 1000,
    rainMax: 2000,
    water: ["High"],
  },
  {
    name: "Wheat",
    soils: ["Loamy", "Clay"],
    tempMin: 10,
    tempMax: 25,
    rainMin: 300,
    rainMax: 900,
    water: ["Medium"],
  },
  {
    name: "Maize",
    soils: ["Loamy", "Black"],
    tempMin: 18,
    tempMax: 32,
    rainMin: 500,
    rainMax: 1200,
    water: ["Medium"],
  },
  {
    name: "Millet",
    soils: ["Sandy", "Red", "Black"],
    tempMin: 20,
    tempMax: 35,
    rainMin: 250,
    rainMax: 800,
    water: ["Low", "Medium"],
  },
  {
    name: "Cotton",
    soils: ["Black", "Loamy"],
    tempMin: 21,
    tempMax: 35,
    rainMin: 500,
    rainMax: 1000,
    water: ["Medium"],
  },
  {
    name: "Groundnut",
    soils: ["Sandy", "Red", "Loamy"],
    tempMin: 20,
    tempMax: 30,
    rainMin: 400,
    rainMax: 1000,
    water: ["Low", "Medium"],
  },
];

const translations = {
  en: {
    safe: "🟢 Safe",
    moderate: "🟡 Moderate Risk",
    critical: "🔴 Critical Risk",
    immediate: "Immediate action needed.",
    careful: "Needs attention and preventive action.",
    stable: "Conditions are mostly stable.",
    switchCrop: "Switch to a safer crop option.",
    adjustIrrigation: "Adjust irrigation based on water need.",
    monitorTemp: "Monitor temperature and protect crop if needed.",
    improveMatch: "Choose crop better suited to soil and rainfall.",
    altLabel: "Safer alternative is",
    reasonStart: "The crop is assessed based on soil match, temperature range, rainfall suitability, and water availability.",
  },
  hi: {
    safe: "🟢 सुरक्षित",
    moderate: "🟡 मध्यम जोखिम",
    critical: "🔴 गंभीर जोखिम",
    immediate: "तुरंत कार्रवाई आवश्यक है।",
    careful: "ध्यान और रोकथाम की आवश्यकता है।",
    stable: "स्थिति अधिकतर स्थिर है।",
    switchCrop: "अधिक सुरक्षित फसल चुनें।",
    adjustIrrigation: "पानी की जरूरत के अनुसार सिंचाई समायोजित करें।",
    monitorTemp: "तापमान पर नजर रखें और फसल की सुरक्षा करें।",
    improveMatch: "मिट्टी और वर्षा के अनुसार बेहतर फसल चुनें।",
    altLabel: "अधिक सुरक्षित विकल्प है",
    reasonStart: "फसल का मूल्यांकन मिट्टी, तापमान, वर्षा और पानी की उपलब्धता के आधार पर किया गया है।",
  },
  kn: {
    safe: "🟢 ಸುರಕ್ಷಿತ",
    moderate: "🟡 ಮಧ್ಯಮ ಅಪಾಯ",
    critical: "🔴 ಗಂಭೀರ ಅಪಾಯ",
    immediate: "ತಕ್ಷಣ ಕ್ರಮ ಅಗತ್ಯ.",
    careful: "ಗಮನ ಮತ್ತು ಮುನ್ನೆಚ್ಚರಿಕೆ ಅಗತ್ಯ.",
    stable: "ಪರಿಸ್ಥಿತಿ ಬಹುತೇಕ ಸ್ಥಿರವಾಗಿದೆ.",
    switchCrop: "ಹೆಚ್ಚು ಸುರಕ್ಷಿತ ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ.",
    adjustIrrigation: "ನೀರಿನ ಅವಶ್ಯಕತೆಗೆ ಅನುಗುಣವಾಗಿ ನೀರಾವರಿ ಸರಿಪಡಿಸಿ.",
    monitorTemp: "ತಾಪಮಾನವನ್ನು ಗಮನಿಸಿ ಮತ್ತು ಬೆಳೆ ರಕ್ಷಿಸಿ.",
    improveMatch: "ಮಣ್ಣು ಮತ್ತು ಮಳೆಯಿಗೆ ಸೂಕ್ತವಾದ ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ.",
    altLabel: "ಹೆಚ್ಚು ಸುರಕ್ಷಿತ ಪರ್ಯಾಯ ಬೆಳೆ",
    reasonStart: "ಬೆಳೆ ಮಣ್ಣು, ತಾಪಮಾನ, ಮಳೆ ಮತ್ತು ನೀರಿನ ಲಭ್ಯತೆ ಆಧಾರದಲ್ಲಿ ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ.",
  }
};

function calculateCropScore(crop, soil, temperature, rainfall, water) {
  let score = 0;
  let reasons = [];
  let issues = [];

  if (crop.soils.includes(soil)) {
    score += 30;
    reasons.push(`${crop.name} matches the selected soil type.`);
  } else {
    issues.push(`Soil type is not ideal for ${crop.name}.`);
  }

  if (temperature >= crop.tempMin && temperature <= crop.tempMax) {
    score += 30;
    reasons.push(`Temperature is within optimal range (${crop.tempMin}-${crop.tempMax}°C).`);
  } else {
    issues.push(`Temperature is outside ideal range (${crop.tempMin}-${crop.tempMax}°C).`);
  }

  if (rainfall >= crop.rainMin && rainfall <= crop.rainMax) {
    score += 25;
    reasons.push(`Rainfall fits the crop requirement (${crop.rainMin}-${crop.rainMax} mm).`);
  } else {
    issues.push(`Rainfall is not suitable for this crop.`);
  }

  if (crop.water.includes(water)) {
    score += 15;
    reasons.push(`Water availability is suitable.`);
  } else {
    issues.push(`Water availability does not match crop need.`);
  }

  let risk = "Safe";
  if (score < 50) risk = "Critical";
  else if (score < 75) risk = "Moderate";

  return { score, reasons, issues, risk };
}

function getRiskClass(risk) {
  if (risk === "Safe") return "safe";
  if (risk === "Moderate") return "moderate";
  return "critical";
}

function getTranslatedRisk(risk, t) {
  if (risk === "Safe") return t.safe;
  if (risk === "Moderate") return t.moderate;
  return t.critical;
}

function getSuggestions(result, t) {
  const suggestions = [];

  if (result.risk === "Critical") {
    suggestions.push(t.switchCrop);
    suggestions.push(t.adjustIrrigation);
    suggestions.push(t.monitorTemp);
    suggestions.push(t.improveMatch);
  } else if (result.risk === "Moderate") {
    suggestions.push(t.adjustIrrigation);
    suggestions.push(t.monitorTemp);
    suggestions.push(t.improveMatch);
  } else {
    suggestions.push("Current crop conditions are favorable. Continue monitoring farm conditions.");
  }

  return suggestions;
}

document.getElementById("analyzeBtn").addEventListener("click", function () {
  const language = document.getElementById("language").value;
  const soil = document.getElementById("soilType").value;
  const temperature = Number(document.getElementById("temperature").value);
  const rainfall = Number(document.getElementById("rainfall").value);
  const water = document.getElementById("water").value;
  const selectedCrop = document.getElementById("crop").value;

  const t = translations[language];

  if (isNaN(temperature) || isNaN(rainfall)) {
    alert("Please enter valid temperature and rainfall values.");
    return;
  }

  const allResults = cropData.map(crop => {
    const result = calculateCropScore(crop, soil, temperature, rainfall, water);
    return {
      crop: crop.name,
      ...result
    };
  });

  allResults.sort((a, b) => b.score - a.score);

  const bestCrop = allResults[0];
  const targetCropResult = allResults.find(item => item.crop === selectedCrop);

  document.getElementById("emptyState").classList.add("hidden");
  document.getElementById("resultArea").classList.remove("hidden");

  document.getElementById("bestCrop").textContent = bestCrop.crop;
  document.getElementById("scoreValue").textContent = `${targetCropResult.score}%`;

  const riskBadge = document.getElementById("riskBadge");
  riskBadge.textContent = getTranslatedRisk(targetCropResult.risk, t);
  riskBadge.className = `risk-badge ${getRiskClass(targetCropResult.risk)}`;

  const explanationText = `
    ${t.reasonStart}
    ${targetCropResult.reasons.join(" ")}
    ${targetCropResult.issues.length ? " Risk factors: " + targetCropResult.issues.join(" ") : ""}
  `;
  document.getElementById("explanationText").textContent = explanationText;

  let priorityMessage = "";
  if (targetCropResult.risk === "Critical") priorityMessage = t.immediate;
  else if (targetCropResult.risk === "Moderate") priorityMessage = t.careful;
  else priorityMessage = t.stable;

  document.getElementById("priorityText").textContent = priorityMessage;

  const suggestionList = document.getElementById("suggestionList");
  suggestionList.innerHTML = "";
  getSuggestions(targetCropResult, t).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    suggestionList.appendChild(li);
  });

  document.getElementById("alternativeCrop").textContent =
    `${t.altLabel} ${bestCrop.crop}.`;

  const cropCards = document.getElementById("cropCards");
  cropCards.innerHTML = "";

  allResults.forEach(item => {
    const div = document.createElement("div");
    div.className = "crop-card";
    div.innerHTML = `
      <h4>${item.crop}</h4>
      <p><strong>Score:</strong> ${item.score}%</p>
      <p><strong>Risk:</strong> <span class="${getRiskClass(item.risk)} risk-badge">${getTranslatedRisk(item.risk, t)}</span></p>
      <p><strong>Why:</strong> ${item.reasons[0] || "Basic match available."}</p>
    `;
    cropCards.appendChild(div);
  });
});