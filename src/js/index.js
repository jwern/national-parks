import "../scss/style.scss";
import "../template.html"; // For dev-server hot-reload
import nationalParksKey from "./secret.js";
import backupParks from "./backupData.js";

const fetchParksData = function () {
  return fetch(
    `https://developer.nps.gov/api/v1/parks?stateCode=CA&limit=12&api_key=${nationalParksKey}`,
    { mode: "cors" }
  )
    .then((result) => {
      if (result.ok) {
        // if code 200
        return result.json(); // finish reading the data
      } else {
        throw result;
      }
    })
    .then((response) => response) // return read data
    .catch((err) => displayError(err));
};

// We only want the first 3 actiivties at most, but:
// some parks won't have 3 activities
const getParkActivities = (park) => {
  const activities = park.activities.slice(0, 3);
  const selection = activities.map((activity) => activity.name);

  return selection.join(", ");
};

const gpsNumber = (number) => Number(number).toFixed(3);

const formatCoordinates = (park) => {
  const latitude = gpsNumber(park.latitude);
  const longitude = gpsNumber(park.longitude);

  let northSouth, eastWest;

  latitude < 0 ? (northSouth = "S") : (northSouth = "N");
  longitude < 0 ? (eastWest = "W") : (eastWest = "E");

  return `${latitude} ${northSouth} ${longitude} ${eastWest}`;
};

const findNextSpace = (description, max) => {
  if (description[max] !== " ") {
    max = description.indexOf(" ", max);
  }

  return description.slice(0, max);
};

const truncateDescription = (description) => {
  const maxCharacters = 160;
  let shortened;

  if (description.length > maxCharacters) {
    shortened = `${findNextSpace(description, maxCharacters)}...`;
  } else {
    shortened = description;
  }

  return shortened;
};

const createParkCard = (park) => {
  const cardTemplate = document.getElementById("card-template");
  const card = cardTemplate.content.cloneNode(true);

  const parkName = card.querySelector(".park-name");
  parkName.innerText = park.fullName;

  const parkImage = card.querySelector(".park-image");
  // could add randomizing function -- pull random image from array
  parkImage.src = park.images[0].url;
  parkImage.alt = park.fullName;

  const parkDescription = card.querySelector(".park-description");
  parkDescription.innerText = truncateDescription(park.description);

  const parkCoordinates = card.querySelector(".park-coordinates");
  parkCoordinates.innerText = formatCoordinates(park);

  const parkActivities = card.querySelector(".park-activities");
  parkActivities.innerText = getParkActivities(park);

  const parkLink = card.querySelector(".park-link");
  parkLink.href = park.url;

  return card;
};

const appendParkCard = (card) => {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.appendChild(card);
};

const displayParkData = (data) => {
  for (let park of data) {
    let card = createParkCard(park);
    appendParkCard(card);
  }
};

const parksData = async () => {
  const data = await fetchParksData();
  if (data) {
    displayParkData(data.data);
  } else {
    displayParkData(backupParks.data); // saved data on 4 parks in case NPS is offline
  }
};

// Fetch and display parks data
window.addEventListener("load", parksData);

// Just for fun: "walk" the logo on hover
window.addEventListener("load", () => {
  const logo = document.querySelector(".logo");
  logo.addEventListener("mouseenter", (event) => {
    event.target.classList.add("start-walking");
    event.target.classList.toggle("paused");
  });
});
