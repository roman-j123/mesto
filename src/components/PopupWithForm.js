import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector,{handleSubmitForm}) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }
  _getInputValues() {
    // Забираем все элементы полей
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    // Создаем пустой объект
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    })
  }
  close() {
    super.close();
    this._popupSelector.querySelector('.popup__form').reset();
    this._popupSelector.querySelector('.popup__button').setAttribute('disabled', '');
  }
}
