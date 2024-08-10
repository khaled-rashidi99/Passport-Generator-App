import {
  generateRandomDate,
  generatePassportNum,
  createRecentItemDiv,
  createRecentResultsHeader,
} from "./utils.js";

// setting and assign variables
const nameInput = document.getElementById("inputName");
const idInput = document.getElementById("inputID");

const nameResult = document.getElementById("result-name");
const idResult = document.getElementById("result-id");
const passportNumResult = document.getElementById("result-passportnum");
const releaseDateResult = document.getElementById("result-date");

const recentResultsDiv = document.getElementById("recents");

let recentResults = [];

const passportNumbers = new Set();

var form = document.getElementById("formId");

// submit form main function
function submitForm(event) {
  event.preventDefault();
  if (!event.target.checkValidity()) return;

  let name = nameInput.value;
  let id = idInput.value;
  let passportNumber;
  let releaseDate = generateRandomDate();

  // ensure the generated passport number is unique
  do {
    passportNumber = generatePassportNum(nameInput.value, idInput.value);
  } while (passportNumbers.has(passportNumber));

  passportNumbers.add(passportNumber);

  nameResult.innerText = name;
  idResult.innerText = id;
  passportNumResult.innerText = passportNumber;
  releaseDateResult.innerText = releaseDate;

  updateRecents({
    name,
    id,
    passportNumber,
    releaseDate,
  });

  event.target.reset();
}
// add the last result to the array of recents results and remove the oldest result if recents > 3
function updateRecents(lastResult) {
  recentResults.push(lastResult);
  let recents = recentResultsDiv.getElementsByClassName("recent-item");

  if (recentResults.length == 1) {
    createRecentResultsHeader(recentResultsDiv);
  }

  if (recentResults.length > 3) {
    recentResults.slice(1);
    recentResultsDiv.removeChild(recents[recents.length - 1]);
    recents = recentResultsDiv.getElementsByClassName("recent-item");
  }

  const recentItem = createRecentItemDiv(lastResult);

  // append the recentItem div to the container
  if (recents.length == 0) {
    recentResultsDiv.appendChild(recentItem);
  } else recentResultsDiv.insertBefore(recentItem, recents[0]);
}

form.addEventListener("submit", submitForm);
