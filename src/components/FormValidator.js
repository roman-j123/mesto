import { params } from "../utils/config";

export class FormValidator{
  constructor (params, formSelector) {
    this._formSelector = formSelector;
    this._formElement = document.querySelector(formSelector);
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._errorClass = params.errorClass;

  }
  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}_error`);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }
  _hideInputError(inputElement){
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}_error`);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._errorClass);
  }
  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  _toggleButtonState(inputList, buttonElement){
    if(this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.removeAttribute('disabled')
    }
  }
  disableButton() {
    return document.querySelector(this._submitButtonSelector).setAttribute('disabled', 'disabled');
  }
  clearErrors() {
    this._formElement.querySelectorAll(params.inputErrorClass).forEach((element) => {
      element.textContent = "";
    });
  }
  _checkInputValidity(inputElement){
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _setEventListeners(){
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      })
    })
  }
  enableValidation(){
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

