import nationalParksKey from "./secret.js";
import backupParks from "./backupData.js";
import displayParkData from "./displayData.js";

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

const parksData = async () => {
  const data = await fetchParksData();
  if (data) {
    displayParkData(data.data);
  } else {
    displayParkData(backupParks.data); // saved data on 4 parks in case NPS is offline
  }
};

export default parksData;
