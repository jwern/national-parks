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

    let northSouth, eastWest;

    latitude < 0 ? (northSouth = "S") : (northSouth = "N");
    longitude < 0 ? (eastWest = "W") : (eastWest = "E");

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
    let shortened;

    if (string.length > maxCharacters) {
      shortened = `${Park.findNextSpace(string, maxCharacters)}...`;
    } else {
      shortened = string;
    }

    return shortened;
  }

  static randomIndexNumber(max) {
    return Math.floor(Math.random() * max);
  }

  selectImage() {
    let chosenImage = this.images[Park.randomIndexNumber(this.images.length)];
    return [chosenImage.url, chosenImage.altText];
  }

  createCard() {
    const cardTemplate = document.getElementById("card-template");
    const card = cardTemplate.content.cloneNode(true);

    const parkName = card.querySelector(".park-name");
    parkName.innerText = this.name;

    const parkImage = card.querySelector(".park-image");
    [parkImage.src, parkImage.alt] = this.selectImage();

    const parkDescription = card.querySelector(".park-description");
    parkDescription.innerText = Park.truncateString(this.description);

    const parkCoordinates = card.querySelector(".park-coordinates");
    parkCoordinates.innerText = this.formatCoordinates();

    const parkActivities = card.querySelector(".park-activities");
    parkActivities.innerText = this.getActivities();

    const parkLink = card.querySelector(".park-link");
    parkLink.href = this.link;

    return card;
  }
}

const getCardsContainer = () => document.querySelector(".cards-container");

const appendParkCard = (card) => {
  const cardsContainer = getCardsContainer();
  cardsContainer.appendChild(card);
};

const displayParkData = (data) => {
  for (let park of data) {
    let parkInstance = new Park(park);
    let card = parkInstance.createCard();
    appendParkCard(card);
  }
};

const clearParksCards = () => {
  const cardsContainer = getCardsContainer();
  while (cardsContainer.lastChild) {
    cardsContainer.removeChild(cardsContainer.lastChild);
  }
};

export { displayParkData, clearParksCards };
