function applySavedFontSize() {
  const savedSize = localStorage.getItem("footballForYouFontSize") || "default";
  setFontSize(savedSize, false);
}

function setFontSize(size, save = true) {
  document.documentElement.classList.remove("font-small", "font-default", "font-large");

  if (size === "small") {
    document.documentElement.classList.add("font-small");
  } else if (size === "large") {
    document.documentElement.classList.add("font-large");
  } else {
    document.documentElement.classList.add("font-default");
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
