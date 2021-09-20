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

  let northSouth = latitude < 0 ? "S" : "N";
  let eastWest = longitude < 0 ? "W" : "E";

  return `${latitude} ${northSouth} ${longitude} ${eastWest}`;
};

const findNextSpace = (description, max) => {
  if (description[max] !== " ") {
    max = description.indexOf(" ", max);
  }

  return description.slice(0, max);
};

const truncateString = (description) => {
  const maxCharacters = 160;

  return description.length > maxCharacters
    ? `${findNextSpace(description, maxCharacters)}...`
    : description;
};

const createParkCard = (park) => {
  const cardTemplate = document.getElementById("card-template");
  const card = cardTemplate.content.cloneNode(true);

  const parkName = card.querySelector(".park-name");
  parkName.innerText = park.fullName;

  const parkImage = card.querySelector(".park-image");
  // could add randomizing function -- pull random image from array
  // Math.floor(Math.random() * max);
  parkImage.src = park.images[0].url;
  parkImage.alt = park.fullName;

  const parkDescription = card.querySelector(".park-description");
  parkDescription.innerText = truncateString(park.description);

  const parkCoordinates = card.querySelector(".park-coordinates");
  parkCoordinates.innerText = formatCoordinates(park);

  const parkActivities = card.querySelector(".park-activities");
  parkActivities.innerText = getParkActivities(park);

  const parkLink = card.querySelector(".park-link");
  parkLink.href = park.url;

  return card;
};

const getCardsContainer = () => document.querySelector(".cards-container");

const appendParkCard = (card) => {
  const cardsContainer = getCardsContainer();
  cardsContainer.appendChild(card);
};

const displayParkData = (data) => {
  for (let park of data) {
    let card = createParkCard(park);
    appendParkCard(card);
  }
};

const clearParksCards = () => {
  const cardsContainer = getCardsContainer();
  while (cardsContainer.lastChild) {
    cardsContainer.removeChild(cardsContainer.lastChild);
  }
};

export { displayParkData, clearParksCards };
