import nationalParksKey from "./secret.js";
import backupParks from "./backup.js";
import { displayParkData, clearParksCards } from "./displayData.js";
import states from "./formStates.js";

const fetchParksData = (state) => {
  return fetch(
    `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=12&api_key=${nationalParksKey}`,
    { mode: "cors" }
  );
};

const parksData = async (state) => {
  try {
    const response = await fetchParksData(state);
    const data = await response.json();

    displayParkData(data.data);
  } catch {
    displayParkData(backupParks.data);
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
