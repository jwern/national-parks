import "../scss/style.scss";
import {
  parksData,
  addListenerToForm,
  appendOptionsToForm,
} from "./fetchData.js";

// Just for fun: "walk" the logo on hover
const addListenerToLogo = () => {
  const logo = document.querySelector(".logo");
  logo.addEventListener("mouseenter", (event) => {
    event.target.classList.add("start-walking");
    event.target.classList.toggle("paused");
  });
};

// Page setup on load
window.addEventListener("load", () => {
  addListenerToForm();
  appendOptionsToForm();
  parksData("CA");
  addListenerToLogo();
});
