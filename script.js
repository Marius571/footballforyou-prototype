function showMessage() {
  const message = document.getElementById("message");
  if (message) {
    message.textContent =
      "Der Prototyp zeigt eine erste Struktur für eine generationenübergreifende Vereinsplattform.";
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
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "Die Anfrage wurde erfolgreich übermittelt.";
  formMessage.style.color = "green";

  empfaenger.value = "";
  betreff.value = "";
  nachricht.value = "";
}
