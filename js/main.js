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

// 1. Validerar formulärets inmatning
function validateForm() {
  // Återställ arrayen för felmeddelanden inför ny validering
  errors = [];

  // Kontrollera att obligatoriska fält inte är tomma
  if (fullnameInput.value.trim() === "") {
    errors.push("Du måste ange ett namn.");
  }
  if (emailInput.value.trim() === "") {
    errors.push("Du måste ange en emailadress.");
  }
  if (phoneInput.value.trim() === "") {
    errors.push("Du måste ange ett telefonnummer.");
  }

  // Returnera true om inga fel finns, annars false
  if (errors.length === 0) {
    return true;
  } else {
    return false;
  }
}

// 2. Skriver ut felmeddelanden på skärmen
function displayErrors() {
  // Töm listan med tidigare fel
  errorList.innerHTML = "";

  // Skapa och lägg till ett nytt listelement (li) för varje fel
  errors.forEach(function (error) {
    let li = document.createElement("li");
    li.textContent = error;
    errorList.appendChild(li);
  });
}

// 3. Bygger och visar det aktuella studentkortet
function createStudentCard() {
  // Fyll studentkortet med data från formuläret
  previewFullname.textContent = fullnameInput.value;
  previewEmail.textContent = emailInput.value;
  previewPhone.textContent = phoneInput.value;

  // Använd det valda typsnittet
  previewFullname.style.fontFamily = fontSelect.value;
  previewEmail.style.fontFamily = fontSelect.value;
  previewPhone.style.fontFamily = fontSelect.value;

  // Skapa ett objekt med studentens data
  let studentObject = {
    fullname: fullnameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    font: fontSelect.value,
  };

  // Lägg till det nya kortet överst i historik-arrayen
  history.unshift(studentObject);

  // Spara ändringen och rita ut historiken på nytt
  saveHistory();
  renderHistory();
}

// 4. Sparar historiken till LocalStorage
function saveHistory() {
  // Omvandla historik-arrayen till en JSON-sträng
  let historyString = JSON.stringify(history);

  // Spara datan i webbläsarens minne
  localStorage.setItem("savedStudents", historyString);
}

// 5. Hämtar historik från LocalStorage vid sidladdning
function loadHistory() {
  // Hämta sparad data från webbläsarens minne
  let savedData = localStorage.getItem("savedStudents");

  // Om data finns, omvandla tillbaka till en array
  if (savedData !== null) {
    history = JSON.parse(savedData);
  }

  // Visa den hämtade historiken på skärmen
  renderHistory();
}

// 6. Visa historiken på skärmen
function renderHistory() {
  // Töm historiksektionen för att undvika dubbletter
  historySection.innerHTML = "";

  // Skapa ett nytt HTML-kort för varje sparad student
  history.forEach(function (student) {
    let cardDiv = document.createElement("div");

    // Applicera typsnitt
    cardDiv.style.fontFamily = student.font;

    // Fyll kortet med HTML-innehåll
    cardDiv.innerHTML = `
      <h3>${student.fullname}</h3>
      <p>${student.email}</p>
      <p>${student.phone}</p>
    `;

    // Lägg till det skapade kortet på sidan
    historySection.appendChild(cardDiv);
  });
}

// 7. Rensar formulär och aktuellt studentkort
function clearForm() {
  // Återställ formulärets fält
  form.reset();

  // Töm felmeddelanden i både array och på skärm
  errors = [];
  errorList.innerHTML = "";

  // Töm texten i studentkortets förhandsgranskning
  previewFullname.textContent = "";
  previewEmail.textContent = "";
  previewPhone.textContent = "";
}

// 8. Raderar all historik
function deleteHistory() {
  // Töm historik-arrayen
  history = [];

  // Ta bort den sparade datan från LocalStorage
  localStorage.removeItem("savedStudents");

  // Töm historiksektionen på skärmen
  renderHistory();
}

// --- EVENTLYSSNARE (Hantering av klick och sidladdning) ---

// Hanterar inskickning av formuläret
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = validateForm();

  // Om valideringen misslyckas, visa felmeddelanden. Annars bygg kortet.
  if (isValid === false) {
    displayErrors();
  } else {
    errorList.innerHTML = "";
    createStudentCard();
  }
});

// Hanterar klick på knappen "Rensa"
clearButton.addEventListener("click", function (event) {
  event.preventDefault();
  clearForm();
});

// Hanterar klick på knappen "Radera historik"
deleteHistoryButton.addEventListener("click", function (event) {
  event.preventDefault();
  deleteHistory();
});

// Hanterar inläsning av data när hela webbsidan laddas
window.addEventListener("DOMContentLoaded", function () {
  loadHistory();
});
