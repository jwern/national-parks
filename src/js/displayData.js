class Park {
  constructor(parkObject) {
    this.name = parkObject.fullName;
    this.description = parkObject.description;
    this.images = parkObject.images;
    this.link = parkObject.url;
    this.latitude = parkObject.latitude;
    this.longitude = parkObject.longitude;
    this.activities = parkObject.activities;
  }

  getActivities() {
    const activities = this.activities.slice(0, 3);
    const selection = activities.map((activity) => activity.name);

    return selection.join(", ");
  }

  static gpsNumber(coord, decimal) {
    return Number(coord).toFixed(decimal);
  }

  formatCoordinates() {
    const latitude = Park.gpsNumber(this.latitude, 3);
    const longitude = Park.gpsNumber(this.longitude, 3);

    let northSouth = latitude < 0 ? "S" : "N";
    let eastWest = longitude < 0 ? "W" : "E";

    return `${latitude} ${northSouth} ${longitude} ${eastWest}`;
  }

  static findNextSpace(string, max) {
    if (string[max] !== " ") {
      max = string.indexOf(" ", max);
    }

    return string.slice(0, max);
  }

  static truncateString(string) {
    const maxCharacters = 160;
    return string.length > maxCharacters
      ? `${Park.findNextSpace(string, maxCharacters)}...`
      : string;
  }

  static randomIndexNumber(max) {
    return Math.floor(Math.random() * max);
  }

  selectImage() {
    let chosenImage = this.images[Park.randomIndexNumber(this.images.length)];
    return [chosenImage.url, chosenImage.altText];
  }
}

const createCard = (park) => {
  const cardTemplate = document.getElementById("card-template");
  const card = cardTemplate.content.cloneNode(true);

  const parkName = card.querySelector(".park-name");
  parkName.innerText = park.name;

  const parkImage = card.querySelector(".park-image");
  [parkImage.src, parkImage.alt] = park.selectImage();

  const parkDescription = card.querySelector(".park-description");
  parkDescription.innerText = Park.truncateString(park.description);

  const parkCoordinates = card.querySelector(".park-coordinates");
  parkCoordinates.innerText = park.formatCoordinates();

  const parkActivities = card.querySelector(".park-activities");
  parkActivities.innerText = park.getActivities();

  const parkLink = card.querySelector(".park-link");
  parkLink.href = park.link;

  return card;
};

const createHero = (imageArray) => {
  const selectedImage =
    imageArray[Park.randomIndexNumber(imageArray.length)][0];

  const heroBanner = document.querySelector(".hero-banner");
  heroBanner.style.backgroundImage = `url(${selectedImage})`;
};

const getCardsContainer = () => document.querySelector(".cards-container");

const appendParkCard = (card) => {
  const cardsContainer = getCardsContainer();
  cardsContainer.appendChild(card);
};

const displayParkData = (data) => {
  let hero = [];

  for (let parkData of data) {
    let park = new Park(parkData);
    let card = createCard(park);
    hero.push(park.selectImage());
    appendParkCard(card);
  }

  createHero(hero);
};

const clearParksCards = () => {
  const cardsContainer = getCardsContainer();
  while (cardsContainer.lastChild) {
    cardsContainer.removeChild(cardsContainer.lastChild);
  }
};

export { displayParkData, clearParksCards };
