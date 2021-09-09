import nationalParksKey from "./secret.js";
import backupParks from "./backup.js";
import { displayParkData, clearParksCards } from "./displayData.js";
import states from "./formStates.js";

const fetchParksData = async (state) => {
  let parks;

  try {
    const response = await fetch(
      `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=12&api_key=${nationalParksKey}`,
      { mode: "cors" }
    );
    const data = await response.json();

    if (response.ok) {
      parks = data.data;
    } else {
      parks = backupParks.data;
    }
  } catch {
    parks = backupParks.data;
  }

  return parks;
};

const fetchAndDisplayData = async (state) => {
  const parks = await fetchParksData(state);
  displayParkData(parks);
};

// const parksData = async (state) => {
//   let parks;

//   try {
//     const response = await fetchParksData(state);
//     const data = await response.json();

//     if (response.ok) {
//       parks = data.data;
//     } else {
//       parks = backupParks.data;
//     }
//   } catch {
//     parks = backupParks.data;
//   }

//   displayParkData(parks);
// };

const getStateFromDropdown = (formInput) => {
  clearParksCards();
  fetchAndDisplayData(formInput.value);
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

export { fetchAndDisplayData, addListenerToForm, appendOptionsToForm };
