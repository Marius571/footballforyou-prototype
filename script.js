function showMessage() {
  const message = document.getElementById("message");

  if (message) {
    message.textContent =
      "FootballForYou bündelt Termine, Aufgaben und Anfragen in einer verständlichen und barrierearmen Oberfläche.";
    message.style.color = "#123b66";
  }
}

function submitRequest() {
  const empfaenger = document.getElementById("empfaenger");
  const betreff = document.getElementById("betreff");
  const nachricht = document.getElementById("nachricht");
  const formMessage = document.getElementById("formMessage");

  if (!empfaenger || !betreff || !nachricht || !formMessage) {
    return;
  }

  if (
    empfaenger.value.trim() === "" ||
    betreff.value.trim() === "" ||
    nachricht.value.trim() === ""
  ) {
    formMessage.textContent = "Bitte füllen Sie alle Felder vollständig aus.";
    formMessage.style.color = "#b00020";
    return;
  }

  formMessage.textContent = "Die Anfrage wurde erfolgreich übermittelt.";
  formMessage.style.color = "#1b6e1b";

  empfaenger.value = "";
  betreff.value = "";
  nachricht.value = "";
}

function filterAppointments(category, clickedButton) {
  const appointments = document.querySelectorAll(".appointment-item");
  const filterButtons = document.querySelectorAll(".filter-button");

  appointments.forEach((item) => {
    if (category === "alle" || item.dataset.category === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  filterButtons.forEach((button) => {
    button.classList.remove("active-filter");
  });

  if (clickedButton) {
    clickedButton.classList.add("active-filter");
  }
}
