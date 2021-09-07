import "../scss/style.scss";
import "../template.html"; // For dev-server hot-reload
import parksData from "./fetchData.js";

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
