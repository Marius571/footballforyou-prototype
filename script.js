function setFontSize(size, save = true) {
  document.body.classList.remove("font-small", "font-default", "font-large");

  if (size === "small") {
    document.body.classList.add("font-small");
  } else if (size === "large") {
    document.body.classList.add("font-large");
  } else {
    document.body.classList.add("font-default");
  }

  const buttons = document.querySelectorAll(".font-button");
  buttons.forEach((button) => button.classList.remove("active-font"));

  const buttonIndexMap = {
    small: 0,
    default: 1,
    large: 2
  };

  const targetIndex = buttonIndexMap[size];
  if (targetIndex !== undefined && buttons[targetIndex]) {
    buttons[targetIndex].classList.add("active-font");
  }

  if (save) {
    localStorage.setItem("footballForYouFontSize", size);
  }
}

Nur die erste Hälfte hat sich geändert (die vier documentElement → body), der Rest ist identisch zu deinem.

Warum das der Fix ist: Dein CSS zielt auf body.font-small, body.font-default, body.font-large. Der Code hängte die Klassen aber ans <html>-Element (documentElement) — also an ein Element, für das es keine passende CSS-Regel gibt. Jetzt landen sie am <body>, wo body.font-large { font-size: 1.14rem } greift.

So testest du, ob's wirklich läuft (30 Sekunden):

Seite im Browser öffnen, „👁️ Ansicht" anklicken, dann A+ Größere Schrift.
Der Text muss sofort sichtbar größer werden.
Seite neu laden (F5) — die große Schrift muss erhalten bleiben (das ist die localStorage-Persistenz, die dann automatisch mitfunktioniert).
Auf A Standard zurückstellen, damit die Seite normal startet.

Wenn alle vier Schritte klappen, stimmt jetzt auch alles, was du in 5.2, 6.3 und SMART-Ziel 1 dazu geschrieben hast.

Ein optionaler Bonus, falls du's rund machen willst: Aktuell zeigt das Menü beim Öffnen nicht an, welche Stufe gerade aktiv ist, bis man klickt. Wenn du am Ende von applySavedFontSize nichts weiter tust, ist das okay — die aktive Markierung wird beim ersten Klick gesetzt. Kein Muss fürs Bestehen, nur Kosmetik. Sag Bescheid, falls du's trotzdem willst.

Womit geht's weiter — Encoding-Fix (csquotes) oder KI-Verzeichnis?

function applySavedFontSize() { const savedSize = localStorage.getItem("footballForYouFontSize") || "default"; setFontSize(savedSize, false); } function setFontSize(size, save = true) { document.documentElement.classList.remove("font-small", "font-default", "font-large"); if (size === "sma

PASTED

Gib mir die fertige script.js :

Hier die komplette, reparierte script.js — nur die vier Stellen in setFontSize (document.documentElement → document.body) sind geändert, der Rest ist identisch zu deinem:

javascript
function applySavedFontSize() {
  const savedSize = localStorage.getItem("footballForYouFontSize") || "default";
  setFontSize(savedSize, false);
}

function setFontSize(size, save = true) {
  document.body.classList.remove("font-small", "font-default", "font-large");

  if (size === "small") {
    document.body.classList.add("font-small");
  } else if (size === "large") {
    document.body.classList.add("font-large");
  } else {
    document.body.classList.add("font-default");
  }

  const buttons = document.querySelectorAll(".font-button");
  buttons.forEach((button) => button.classList.remove("active-font"));

  const buttonIndexMap = {
    small: 0,
    default: 1,
    large: 2
  };

  const targetIndex = buttonIndexMap[size];
  if (targetIndex !== undefined && buttons[targetIndex]) {
    buttons[targetIndex].classList.add("active-font");
  }

  if (save) {
    localStorage.setItem("footballForYouFontSize", size);
  }
}

function toggleViewMenu() {
  const toggleButton = document.getElementById("viewMenuToggle");
  const panel = document.getElementById("viewMenuPanel");

  if (!toggleButton || !panel) {
    return;
  }

  const isHidden = panel.hasAttribute("hidden");

  if (isHidden) {
    panel.removeAttribute("hidden");
    toggleButton.setAttribute("aria-expanded", "true");
  } else {
    panel.setAttribute("hidden", "");
    toggleButton.setAttribute("aria-expanded", "false");
  }
}

function closeViewMenu() {
  const toggleButton = document.getElementById("viewMenuToggle");
  const panel = document.getElementById("viewMenuPanel");

  if (!toggleButton || !panel) {
    return;
  }

  panel.setAttribute("hidden", "");
  toggleButton.setAttribute("aria-expanded", "false");
}

function submitRequest() {
  const empfaenger = document.getElementById("empfaenger");
  const betreff = document.getElementById("betreff");
  const nachricht = document.getElementById("nachricht");
  const datenschutz = document.getElementById("datenschutz");
  const website = document.getElementById("website");
  const formMessage = document.getElementById("formMessage");

  if (!empfaenger || !betreff || !nachricht || !datenschutz || !website || !formMessage) {
    return;
  }

  const felder = [empfaenger, betreff, nachricht, datenschutz];

  felder.forEach((feld) => {
    feld.classList.remove("error-field");
    feld.removeAttribute("aria-invalid");
  });

  formMessage.textContent = "";

  const empfaengerWert = empfaenger.value.trim();
  const betreffWert = betreff.value.trim();
  const nachrichtWert = nachricht.value.trim();
  const honeypotWert = website.value.trim();

  if (honeypotWert !== "") {
    formMessage.textContent = "Die Anfrage konnte nicht verarbeitet werden.";
    formMessage.style.color = "#b00020";
    return;
  }

  let fehlerVorhanden = false;

  if (empfaengerWert === "") {
    empfaenger.classList.add("error-field");
    empfaenger.setAttribute("aria-invalid", "true");
    fehlerVorhanden = true;
  }

  if (betreffWert === "") {
    betreff.classList.add("error-field");
    betreff.setAttribute("aria-invalid", "true");
    fehlerVorhanden = true;
  }

  if (nachrichtWert === "") {
    nachricht.classList.add("error-field");
    nachricht.setAttribute("aria-invalid", "true");
    fehlerVorhanden = true;
  }

  if (!datenschutz.checked) {
    datenschutz.classList.add("error-field");
    datenschutz.setAttribute("aria-invalid", "true");
    fehlerVorhanden = true;
  }

  if (fehlerVorhanden) {
    formMessage.textContent =
      "Bitte füllen Sie alle Pflichtfelder aus und stimmen Sie den Datenschutzhinweisen zu.";
    formMessage.style.color = "#b00020";
    return;
  }

  formMessage.textContent =
    "Ihre Nachricht wurde erfolgreich geprüft und im Prototyp zum Versand vorbereitet.";
  formMessage.style.color = "#1b6e1b";

  empfaenger.value = "";
  betreff.value = "";
  nachricht.value = "";
  datenschutz.checked = false;
}

function filterAppointments(category, clickedButton, label) {
  const appointments = document.querySelectorAll(".appointment-item");
  const filterButtons = document.querySelectorAll(".filter-button");
  const filterStatus = document.getElementById("filterStatus");

  appointments.forEach((item) => {
    if (category === "alle" || item.dataset.category === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  filterButtons.forEach((button) => {
    button.classList.remove("active-filter");
    button.setAttribute("aria-pressed", "false");
  });

  if (clickedButton) {
    clickedButton.classList.add("active-filter");
    clickedButton.setAttribute("aria-pressed", "true");
  }

  if (filterStatus && label) {
    filterStatus.textContent = "Aktuell angezeigt: " + label;
  }
}

document.addEventListener("click", function (event) {
  const viewMenu = document.querySelector(".view-menu");
  const panel = document.getElementById("viewMenuPanel");

  if (!viewMenu || !panel || panel.hasAttribute("hidden")) {
    return;
  }

  if (!viewMenu.contains(event.target)) {
    closeViewMenu();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeViewMenu();
  }
});

document.addEventListener("DOMContentLoaded", applySavedFontSize);
