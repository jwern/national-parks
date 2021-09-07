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

const truncateString = (description) => {
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
  parkDescription.innerText = truncateString(park.description);

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

export default displayParkData;
