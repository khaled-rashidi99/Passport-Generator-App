// function that generates random codes
export function generateRandomCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

// function that generates passport numbers
export function generatePassportNum(name, id) {
  name = name.slice(0, 2).toUpperCase();
  id = id.toString().slice(0, 2);
  return `${name}${id}-${generateRandomCode()}-${generateRandomCode()}`;
}

// function that generates random dates between the start date and the end date
export function generateRandomDate() {
  const startDate = new Date(2005, 0, 1); // January 1, 2005
  const endDate = new Date(2023, 0, 1); // January 1, 2023

  const randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );

  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, "0");
  const day = String(randomDate.getDate()).padStart(2, "0");

  const yearsAgo = endDate.getFullYear() - year;
  const dateString = `${year}-${month}-${day} (${yearsAgo} years ago)`;

  return dateString;
}

// function that creates the "Recent Passports" header
export function createRecentResultsHeader(recentResultsDiv) {
  const header = document.createElement("h2");
  header.className = " text-primary-emphasis py-2 ";
  header.id = "recents-header";
  header.innerText = "Recent 3 Passports";
  const recentThreeDiv = document.getElementById("recent-3");
  recentThreeDiv.insertBefore(header, recentResultsDiv);
}

// function that creates the needed paragraph elements
function _createParagraph(text, spanText, margin = true) {
  const pElement = document.createElement("p");
  pElement.innerHTML = `${text} <span>${spanText}</span>`;
  if (!margin) pElement.className = "m-0";
  pElement.classList.add("fw-bold");
  return pElement;
}

// function that creates the outer div with the specified classes -bootstrap classes-
export function createRecentItemDiv(lastResult) {
  const recentItem = document.createElement("div");
  recentItem.className =
    "recent-item d-flex flex-column col-12 align-items-center";

  // create the inner div with the specified classes -bootstrap classes-
  const innerDiv = document.createElement("div");
  innerDiv.className =
    "col-12 result border rounded-4 border-dark p-2 d-flex flex-column flex-sm-row gap-4 gap-sm-0 align-items-center";
  recentItem.appendChild(innerDiv);

  // create and set the image element with specified classes -bootstrap classes-
  const imgElement = document.createElement("img");
  imgElement.src = "../images/photo.png";
  imgElement.alt = "photo";
  imgElement.className =
    "col-3 avatar rounded-circle rounded-5 border border-dark me-2 ms-2";
  innerDiv.appendChild(imgElement);

  // create the content div
  const contentDiv = document.createElement("div");
  contentDiv.className =
    "card-info-inner col-9 ms-3 d-flex flex-column justify-content-center";
  innerDiv.appendChild(contentDiv);

  // create and append paragraph elements with dynamic values
  contentDiv.appendChild(_createParagraph("Name:", lastResult.name));
  contentDiv.appendChild(_createParagraph("ID:", lastResult.id));
  contentDiv.appendChild(
    _createParagraph("Passport Number:", lastResult.passportNumber)
  );
  contentDiv.appendChild(
    _createParagraph("Release Date:", lastResult.releaseDate, false)
  );

  return recentItem;
}
