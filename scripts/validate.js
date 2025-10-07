//show error
function showInputError(formElement, input, errorMessage, config) {
  const errorElement = formElement.querySelector(`#error-${input.name}`);
  if (errorElement) {
    // Verificar que existe
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
    input.classList.add(config.inputErrorClass);
  }
}

// hide error
function hideInputError(formElement, input, config) {
  const errorElement = formElement.querySelector(`#error-${input.name}`);
  if (errorElement) {
    // Verificar que existe
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
    input.classList.remove(config.inputErrorClass);
  }
}

// is valid
function checkisValid(formElement, input, config) {
  if (input.validity.valid) {
    hideInputError(formElement, input, config);
  } else {
    showInputError(formElement, input, input.validationMessage, config);
  }
}

//validate form (All)
function hasFormErrors(inputList) {
  return inputList.some((input) => !input.validity.valid);
}
//button state
function toggleButtonState(inputList, buttonElement, config) {
  if (hasFormErrors(inputList)) {
    // Si HAY errores → deshabilitar botón
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    // Si NO HAY errores → habilitar botón
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

//event listeners
function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkisValid(form, input, config); // Pasar el form
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

//final
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, config);
  });
}

// Reset validation function
export function resetValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // clean inputs errors AND values
  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
    input.value = ""; // ¡Agregar esta línea!
  });

  // disable submit button
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}
