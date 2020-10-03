const params =  {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_type_error-active'
}
const showInputError = (formElement ,inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}_error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorClass);
}
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}_error`);
  errorElement.textContent = "";
  errorElement.classList.remove(params.errorClass);
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.removeAttribute('disabled')
  }
}
const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
//Функция сбора форм
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}
//Функция собра форм
const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
    })
}
enableValidation(params);
