const openFormButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const form = document.querySelector(".popup__form");

const fName = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about");

const inputName = document.querySelector(".fname");
const inputaboutMe = document.querySelector(".aboutMe");

function toggleForm() {
  popup.classList.add("popup_visible");
  fName.textContent = inputName.value;
  aboutMe.textContent = inputaboutMe.value;

  fName.value = "";
  aboutMe.value = "";
}

openFormButton.addEventListener("click", toggleForm);
closeButton.addEventListener("click", toggleForm);

function handleFormSubmit(evt) {
  evt.preventDefault();
  fName.textContent = inputName.value;
  aboutMe.textContent = inputaboutMe.value;
}

form.addEventListener("submit", handleFormSubmit);
