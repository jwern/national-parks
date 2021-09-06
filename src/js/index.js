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
  return park.name;
};

const appendParkCard = (card) => {
  console.log(card);
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
  }
};

parksData();
