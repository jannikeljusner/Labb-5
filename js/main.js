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

  // 2. Ändra typsnittet på texten baserat på vad man valt i rullistan
  previewFullname.style.fontFamily = fontSelect.value;
  previewEmail.style.fontFamily = fontSelect.value;
  previewPhone.style.fontFamily = fontSelect.value;
}

// 4. Sparar till LocalStorage (HÄR SKA VI KODA SEN)
function saveHistory() {}

// 5. Hämtar från LocalStorage (HÄR SKA VI KODA SEN)
function loadHistory() {}

// 6. Ritar ut historiken på skärmen (HÄR SKA VI KODA SEN)
function renderHistory() {}

// 7. Tömmer formuläret (HÄR SKA VI KODA SEN)
function clearForm() {}

// 8. Raderar all historik (HÄR SKA VI KODA SEN)
function deleteHistory() {}

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

  // (HÄR SKA VI KODA SEN)
});

// När man klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", function (event) {
  event.preventDefault();

  // (HÄR SKA VI KODA SEN)
});

// När hela sidan laddas första gången
window.addEventListener("DOMContentLoaded", function () {
  // (HÄR SKA VI KODA SEN)
});
