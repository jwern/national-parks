import "../scss/style.scss";
import "../template.html"; // For dev-server hot-reload
import nationalParksKey from "./secret.js";

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

const createParkCard = (park) => {
  const cardTemplate = document.getElementById("card-template");
  const card = cardTemplate.content.cloneNode(true);

  const parkName = card.querySelector(".park-name");
  parkName.innerText = park.name;

  const parkDescription = card.querySelector(".park-description");
  // ADD TRUNCATING FUNCTION
  parkDescription.innerText = park.description;

  const parkImage = card.querySelector(".park-image");
  // could add randomizing function -- pull random image from array
  parkImage.src = park.images[0].url;

  const parkCoordinates = card.querySelector(".park-coordinates");
  // NEED FORMATTING FUNCTION
  parkCoordinates.innerText = `lat: ${park.latitude}, lon: ${park.longitude}`;

  const parkActivities = card.querySelector(".park-activities");
  // NEED GETTER / FORMATTING FUNCTION -- not all parks have 3 activities
  parkActivities.innerText = `${park.activities[0].name}`;

  const parkLink = card.querySelector(".park-link");
  // decide on link text -- park-unique?
  parkLink.innerText = "Visit Site";
  parkLink.href = park.url;

  return card;
};

const appendParkCard = (card) => {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.appendChild(card);
};

const displayParkData = (data) => {
  console.log(data[0]);
  for (let park of data) {
    let card = createParkCard(park);
    appendParkCard(card);
  }
};

const parksData = async () => {
  const data = await fetchParksData();
  if (data) {
    displayParkData(data.data);
  } // ADD BACKUP IF DATA UNAVAILABLE: A DEFAULT SELECTION OF PARKS
};

parksData();
