const cropData = [
  {
    name: "Rice",
    soils: ["Clay", "Loamy"],
    tempMin: 20,
    tempMax: 35,
    rainMin: 1000,
    rainMax: 2000,
    water: ["High"]
  },
  {
    name: "Wheat",
    soils: ["Loamy", "Clay"],
    tempMin: 10,
    tempMax: 25,
    rainMin: 300,
    rainMax: 900,
    water: ["Medium"]
  },
  {
    name: "Maize",
    soils: ["Loamy", "Black"],
    tempMin: 18,
    tempMax: 32,
    rainMin: 500,
    rainMax: 1200,
    water: ["Medium"]
  },
  {
    name: "Millet",
    soils: ["Sandy", "Red", "Black"],
    tempMin: 20,
    tempMax: 35,
    rainMin: 250,
    rainMax: 800,
    water: ["Low", "Medium"]
  },
  {
    name: "Cotton",
    soils: ["Black", "Loamy"],
    tempMin: 21,
    tempMax: 35,
    rainMin: 500,
    rainMax: 1000,
    water: ["Medium"]
  },
  {
    name: "Groundnut",
    soils: ["Sandy", "Red", "Loamy"],
    tempMin: 20,
    tempMax: 30,
    rainMin: 400,
    rainMax: 1000,
    water: ["Low", "Medium"]
  }
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
    favorable: "Current crop conditions are favorable. Continue monitoring farm conditions."
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
    favorable: "मौजूदा फसल की स्थिति अच्छी है। नियमित निगरानी जारी रखें।"
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
    favorable: "ಪ್ರಸ್ತುತ ಬೆಳೆ ಪರಿಸ್ಥಿತಿ ಉತ್ತಮವಾಗಿದೆ. ನಿರಂತರವಾಗಿ ಗಮನಿಸಿ."
  }
};

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

function calculateCropScore(crop, soil, temperature, rainfall, water) {
  let score = 0;
  const reasons = [];
  const issues = [];

  // Soil
  if (crop.soils.includes(soil)) {
    score += 30;
    reasons.push("Soil is suitable.");
  } else {
    issues.push("Soil is not suitable.");
  }

  // Temperature
  if (temperature >= crop.tempMin && temperature <= crop.tempMax) {
    score += 30;
    reasons.push("Temperature is ideal.");
  } else {
    issues.push("Temperature is not ideal.");
  }

  // 🌧 Rainfall (NEW SIMPLE LOGIC)
  if (
    (crop.name === "Rice" && rainfall === "High") ||
    (crop.name === "Wheat" && rainfall === "Medium") ||
    (crop.name === "Maize" && rainfall === "Medium") ||
    (crop.name === "Millet" && rainfall === "Low") ||
    (crop.name === "Cotton" && rainfall === "Medium") ||
    (crop.name === "Groundnut" && rainfall !== "High")
  ) {
    score += 25;
    reasons.push("Rainfall level is suitable.");
  } else {
    issues.push("Rainfall level is not suitable.");
  }

  // Water
  if (crop.water.includes(water)) {
    score += 15;
    reasons.push("Water availability is good.");
  } else {
    issues.push("Water availability mismatch.");
  }

  let risk = "Safe";
  if (score < 50) risk = "Critical";
  else if (score < 75) risk = "Moderate";

  return {
    score,
    reasons,
    issues,
    risk
  };
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
    suggestions.push(t.favorable);
  }

  return suggestions;
}

window.addEventListener("DOMContentLoaded", function () {
  const analyzeBtn = document.getElementById("analyzeBtn");

  if (!analyzeBtn) {
    console.error("Analyze button not found. Check id='analyzeBtn'.");
    return;
  }

  analyzeBtn.addEventListener("click", function () {
    const languageEl = document.getElementById("language");
    const soilEl = document.getElementById("soil");
    const temperatureEl = document.getElementById("temperature");
    const rainfallEl = document.getElementById("rainfall");
    const waterEl = document.getElementById("water");
    const cropEl = document.getElementById("crop");
    const locationEl = document.getElementById("location");

    const emptyState = document.getElementById("emptyState");
    const resultArea = document.getElementById("resultArea");
    const bestCropEl = document.getElementById("bestCrop");
    const riskBadgeEl = document.getElementById("riskBadge");
    const scoreValueEl = document.getElementById("scoreValue");
    const explanationTextEl = document.getElementById("explanationText");
    const priorityTextEl = document.getElementById("priorityText");
    const suggestionListEl = document.getElementById("suggestionList");
    const alternativeCropEl = document.getElementById("alternativeCrop");
    const cropCardsEl = document.getElementById("cropCards");
    const location = locationEl.value;

    if (
      !languageEl ||
      !soilEl ||
      !temperatureEl ||
      !rainfallEl ||
      !waterEl ||
      !cropEl ||
      !emptyState ||
      !resultArea ||
      !bestCropEl ||
      !riskBadgeEl ||
      !scoreValueEl ||
      !explanationTextEl ||
      !priorityTextEl ||
      !suggestionListEl ||
      !alternativeCropEl ||
      !cropCardsEl
    ) {
      alert("One or more HTML elements are missing. Please use the exact HTML code.");
      return;
    }

    const language = languageEl.value;
    const soil = soilEl.value;
    const temperature = Number(temperatureEl.value);
    const rainfall = rainfallEl.value;
    const water = waterEl.value;
    const selectedCrop = cropEl.value;

    if (Number.isNaN(temperature) || !location) {
  alert("Please enter temperature and location.");
  return;
} 

    const t = translations[language] || translations.en;

    const allResults = cropData.map(function (crop) {
      const result = calculateCropScore(crop, soil, temperature, rainfall, water);
      return {
        crop: crop.name,
        score: result.score,
        reasons: result.reasons,
        issues: result.issues,
        risk: result.risk
      };
    });

    allResults.sort(function (a, b) {
      return b.score - a.score;
    });

    const bestCrop = allResults[0];
    const targetCropResult = allResults.find(function (item) {
      return item.crop === selectedCrop;
    });

    emptyState.classList.add("hidden");
    resultArea.classList.remove("hidden");

    bestCropEl.textContent = bestCrop.crop;
    riskBadgeEl.textContent = getTranslatedRisk(targetCropResult.risk, t);
    riskBadgeEl.className = "risk-badge " + getRiskClass(targetCropResult.risk);
    scoreValueEl.textContent = targetCropResult.score + "%";

    let explanation = t.reasonStart + " ";
    explanation += " Location: " + location + ". ";
    explanation += targetCropResult.reasons.join(" ");
    if (targetCropResult.issues.length > 0) {
      explanation += " Risk factors: " + targetCropResult.issues.join(" ");
    }
    explanationTextEl.textContent = explanation;

    if (targetCropResult.risk === "Critical") {
      priorityTextEl.textContent = t.immediate;
    } else if (targetCropResult.risk === "Moderate") {
      priorityTextEl.textContent = t.careful;
    } else {
      priorityTextEl.textContent = t.stable;
    }

    suggestionListEl.innerHTML = "";
    const suggestions = getSuggestions(targetCropResult, t);

    suggestions.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item;
      suggestionListEl.appendChild(li);
    });

    alternativeCropEl.textContent = t.altLabel + " " + bestCrop.crop + ".";

    cropCardsEl.innerHTML = "";

    allResults.forEach(function (item) {
      const div = document.createElement("div");
      div.className = "crop-card";

      const reasonText = item.reasons.length > 0 ? item.reasons[0] : "Basic match available.";

      div.innerHTML = `
        <h4>${item.crop}</h4>
        <p><strong>Score:</strong> ${item.score}%</p>
        <p><strong>Risk:</strong> <span class="risk-badge ${getRiskClass(item.risk)}">${getTranslatedRisk(item.risk, t)}</span></p>
        <p><strong>Why:</strong> ${reasonText}</p>
      `;

      cropCardsEl.appendChild(div);
    });
  });
});