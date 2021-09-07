import nationalParksKey from "./secret.js";
import backupParks from "./backup.js";
import { displayParkData, clearParksCards } from "./displayData.js";
import states from "./formStates.js";

const fetchParksData = function (state) {
  return fetch(
    `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=12&api_key=${nationalParksKey}`,
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

const parksData = async (state) => {
  const data = await fetchParksData(state);
  if (data) {
    displayParkData(data.data);
  } else {
    displayParkData(backupParks.data); // saved data on 4 parks in case NPS is offline
  }
};

const getStateFromDropdown = (formInput) => {
  clearParksCards();
  parksData(formInput.value);
};

const getForm = () => document.getElementById("state-search");

const addListenerToForm = () => {
  const form = getForm();
  form.addEventListener("change", (event) => {
    getStateFromDropdown(event.target);
  });
};

const appendOptionsToForm = () => {
  const selectForm = getForm();

  for (let state in states) {
    let option = document.createElement("option");
    option.value = state;
    option.name = state;
    option.innerText = states[state];
    selectForm.appendChild(option);
  }
};

export { parksData, addListenerToForm, appendOptionsToForm };
