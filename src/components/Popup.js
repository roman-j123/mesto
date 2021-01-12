export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeByClick = this._closeByClick.bind(this);
  }
  // Отвечает за открытие popup
  open() {
    this._popup.classList.add('popup_open');
    this._popup.addEventListener('mousedown', this._closeByClick);
    document.addEventListener('keydown', this._handleEscClose);
  }
  // Отвечает за закрытие popup
  close() {
    this._popup.classList.remove('popup_open');
    this._popup.removeEventListener('mousedown', this._closeByClick);
    document.removeEventListener('keydown', this._handleEscClose);
  }
  // Добавляет слушатель клика по кнопке
  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', this.close);
  }
  // Содержит логику закрытия по Esc
  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }
  _closeByClick(evt) {
    if(evt.currentTarget === evt.target) {
      this.close();
    }
  }
}
