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
    formMessage.textContent =
      "Die Anfrage konnte nicht verarbeitet werden.";
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
