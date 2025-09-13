const openFormButton = document.querySelector(".profile__edit-button");
const fName = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about");
const inputName = document.querySelector("#fname");
const inputaboutMe = document.querySelector("#aboutMe");

//popup
const popupProfile = document.querySelector("#popup__profile");
const closeButtonProfile = popupProfile.querySelector(".popup__close-button");
const form = document.querySelector(".popup__form");

//cards
const cards = [
  {
    name: "Valle de Yosemite",
    link: "images/yosemite.jpg",
  },
  {
    name: "Colorado",
    link: "images/colorado.jpg",
  },
  {
    name: "Vail",
    link: "images/vail.jpg",
  },
  {
    name: "Utah",
    link: "images/utah.jpg",
  },
  {
    name: "Gran Cañón",
    link: "images/grandCanyon.jpg",
  },
  {
    name: "Mill Valley",
    link: "images/millValley.jpg",
  },
];

const cardsContainer = document.querySelector(".gallery__container");

//nuevas tarjetas
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#popup__new-card");
const closeButtonCard = newCardPopup.querySelector(".popup__close-button");
const formNewCard = document.forms["new-card"];

//Funciones editar
function openProfilePopup() {
  inputName.value = fName.textContent;
  inputaboutMe.value = aboutMe.textContent;

  popupProfile.classList.add("popup_visible");
}

openFormButton.addEventListener("click", openProfilePopup);
closeButtonProfile.addEventListener("click", closeProfilePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  fName.textContent = inputName.value;
  aboutMe.textContent = inputaboutMe.value;
  closeProfilePopup();
}

function closeProfilePopup() {
  popupProfile.classList.remove("popup_visible");
}

form.addEventListener("submit", handleFormSubmit);

// Cards functionality

function createCard(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".gallery__card")
    .cloneNode(true);
  cardElement.querySelector(".gallery__image").src = data.link;
  cardElement.querySelector(".gallery__title").textContent = data.name;
  cardElement
    .querySelector(".gallery__icon-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("gallery__icon-like_active");
    });
  cardElement
    .querySelector(".gallery__icon-delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".gallery__card").remove();
    });
  return cardElement;
}

cards.forEach((card) => {
  const cardElement = createCard(card);
  cardsContainer.prepend(cardElement);
});
//nueva tarjeta funcionalidad

addButton.addEventListener("click", function () {
  newCardPopup.classList.add("popup_visible");
});

formNewCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const titleValue = evt.target.title.value;
  const imageLinkValue = evt.target.imageLink.value;
  const newCardData = {
    name: titleValue,
    link: imageLinkValue,
  };
  const cardElement = createCard(newCardData);
  cardsContainer.prepend(cardElement);
  closeNewCardPopup();
});

function closeNewCardPopup() {
  newCardPopup.classList.remove("popup_visible");
}
closeButtonCard.addEventListener("click", closeNewCardPopup);

//Popup Images
const imagePopup = document.querySelector("#popup__image");
const closeButtonImage = imagePopup.querySelector(".popup__close-button");

//popup imagenes
cardsContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("gallery__image")) {
    imagePopup.classList.add("popup_visible");

    const popupImage = imagePopup.querySelector(".popup__images");
    const caption = imagePopup.querySelector(".popup__caption");

    // Obtener el nombre desde el título de la tarjeta
    const cardTitle = evt.target
      .closest(".gallery__card")
      .querySelector(".gallery__title");

    popupImage.src = evt.target.src;
    popupImage.alt = cardTitle.textContent;
    caption.textContent = cardTitle.textContent; // ¡Aquí está la solución!
  }
});
closeButtonImage.addEventListener("click", function () {
  imagePopup.classList.remove("popup_visible");
});
