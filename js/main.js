"use strict";

// --- HÄMTA ELEMENT FRÅN HTML ---
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");
const deleteHistoryButton = document.querySelector("#delete");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");

// --- VARIABLER ---
let errors = [];
let history = [];

// --- FUNKTIONER ---

// 1. Kollar om fälten är tomma
function validateForm() {
  errors = [];

  if (fullnameInput.value.trim() === "") {
    errors.push("Du måste ange ett namn.");
  }
  if (emailInput.value.trim() === "") {
    errors.push("Du måste ange en emailadress.");
  }
  if (phoneInput.value.trim() === "") {
    errors.push("Du måste ange ett telefonnummer.");
  }

  if (errors.length === 0) {
    return true;
  } else {
    return false;
  }
}

// 2. Skriver ut felen som en lista på skärmen
function displayErrors() {
  errorList.innerHTML = "";

  errors.forEach(function (error) {
    let li = document.createElement("li");
    li.textContent = error;
    errorList.appendChild(li);
  });
}

// 3. Bygger själva studentkortet
function createStudentCard() {
  // 1. Skicka texten från formuläret till studentkortet
  previewFullname.textContent = fullnameInput.value;
  previewEmail.textContent = emailInput.value;
  previewPhone.textContent = phoneInput.value;

  // 2. Ändra typsnittet
  previewFullname.style.fontFamily = fontSelect.value;
  previewEmail.style.fontFamily = fontSelect.value;
  previewPhone.style.fontFamily = fontSelect.value;

  // 3. Skapa ett objekt med all data
  let studentObject = {
    fullname: fullnameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    font: fontSelect.value,
  };

  // 4. Lägg in objektet överst i historik-arrayen
  history.unshift(studentObject);

  // 5. Spara till LocalStorage
  saveHistory();

  // 6. Rita om historiken på sidan så det nya kortet syns direkt!
  renderHistory();
}

// 4. Sparar till LocalStorage (HÄR SKA VI KODA SEN)
function saveHistory() {
  // Gör om hela arrayen till en textsträng (JSON)
  let historyString = JSON.stringify(history);

  // Spara strängen i webbläsarens minne under namnet "savedStudents"
  localStorage.setItem("savedStudents", historyString);
}
// 5. Hämtar från LocalStorage (HÄR SKA VI KODA SEN)
function loadHistory() {
  let savedData = localStorage.getItem("savedStudents");

  if (savedData !== null) {
    history = JSON.parse(savedData);
  }

  // Rita ut historiken när sidan laddas!
  renderHistory();
}

// 6. Ritar ut historiken på skärmen (HÄR SKA VI KODA SEN)
function renderHistory() {
  // 1. Töm historiken på sidan så vi inte får dubbletter när listan ritas om
  historySection.innerHTML = "";

  // 2. Loopa igenom varje sparad student i vår array
  history.forEach(function (student) {
    // Skapa en ny HTML-låda (div) för historikkortet
    let cardDiv = document.createElement("div");

    // Använd vald font på kortet
    cardDiv.style.fontFamily = student.font;

    // Fyll lådan med studentens information
    cardDiv.innerHTML = `
      <h3>${student.fullname}</h3>
      <p>${student.email}</p>
      <p>${student.phone}</p>
    `;

    // Klistra fast lådan i historik-sektionen på webbsidan
    historySection.appendChild(cardDiv);
  });
}

// 7. Tömmer formuläret (HÄR SKA VI KODA SEN)
function clearForm() {
  // 1. Tömmer alla inmatningsfält i formuläret
  form.reset();

  // 2. Raderar arrayen med fel och tömmer listan på skärmen
  errors = [];
  errorList.innerHTML = "";

  // 3. Tömmer texten på själva studentkortet
  previewFullname.textContent = "";
  previewEmail.textContent = "";
  previewPhone.textContent = "";
}

// 8. Raderar all historik (HÄR SKA VI KODA SEN)
function deleteHistory() {
  // 1. Töm själva arrayen
  history = [];

  // 2. Ta bort den sparade datan från LocalStorage
  localStorage.removeItem("savedStudents");

  // 3. Rita om historiken på webbsidan (som nu blir tom)
  renderHistory();
}

// --- EVENTLYSSNARE (Klick och sidladdning) ---

// När man klickar på "Skicka"
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = validateForm();

  if (isValid === false) {
    displayErrors();
  } else {
    // Rensa eventuella gamla felmeddelanden från skärmen
    errorList.innerHTML = "";

    // Bygg studentkortet!
    createStudentCard();
  }
});

// När man klickar på "Rensa"
clearButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Anropa funktionen som rensar formuläret och kortet
  clearForm();
});

// (HÄR SKA VI KODA SEN)

// När man klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Anropa funktionen som raderar all historik
  deleteHistory();
});

// När hela sidan laddas första gången
window.addEventListener("DOMContentLoaded", function () {
  loadHistory();
  console.log(
    "Sidan laddades och historiken hämtades. Så här ser arrayen ut nu:",
    history,
  );
});
