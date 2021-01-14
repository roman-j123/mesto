export class FormValidator{
  constructor (params, formSelector) {
    this._formSelector = formSelector;
    this._formElement = document.querySelector(formSelector);
    this._inputSelector = params.inputSelector;
    this._inputInvaildSelector = params.inputInvaildSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._errorClass = params.errorClass;
    this._inputErrorClass = params.inputErrorClass
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._errorList =  this._formElement.querySelectorAll(params.inputErrorClass)
  }
  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}_error`);
    this._inputElement = this._formElement.querySelector(`.popup__input_type_${inputElement.name}`);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputInvaildSelector);

  }
  _hideInputError(inputElement){
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}_error`);
    this._inputElement.classList.remove(this._inputInvaildSelector);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputInvaildSelector);

  }
  _hasInvalidInput(){
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  _toggleButtonState(){
    if(this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.removeAttribute('disabled');
    }
  }
  disableButton() {
    this._buttonElement.setAttribute('disabled', 'disabled');
  }
  clearErrors() {
    this._inputList.forEach((element) => {
      element.classList.remove(this._inputInvaildSelector);
    });
    this._errorList.forEach((element) => {
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
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
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

