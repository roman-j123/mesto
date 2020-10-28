import * as data from './config.js';
import { openPopup } from './index.js';
export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__header').textContent = this._name;
    this._element.querySelector('.elements__image').src = this._link;
    return this._element;
  }
  _setEventListeners() {
    // Удаление карточки (Находим селектор кнопки -> Вешаем событие -> Возвращаем метод _deleteCard)
    this._element.querySelector('.elements__delete').addEventListener('click', ()=> {
      return this._deleteCard();
    })
    // Лайк карточки (Находим селектор кнопки -> Вешаем событие > Возвращаем метод _likeCard)
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      return this._likeCard();
    })
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      return this._previewCard();
    })
  }
  // Метод удаления карточки (Возвращаем удаление разметки карточки)
  _deleteCard() {
    return this._element.remove();
  }
  // Метод удаления карточки (Запишем нужный селектор в _cardElementLike -> Добавим класс like)
  _likeCard() {
    const _cardElementLike = this._element.querySelector('.elements__like');
    return _cardElementLike.classList.toggle('elements__like_active');
  }
  // Метод просмотра карточки
  _previewCard() {
    data.page.classList.add('page_overflowed');
    data.zoomingImage.src = this._link;
    data.zoomingImage.alt = this._name;
    data.zoomingFigcaption.textContent = this._name;
    openPopup(data.popupZoom);
  }
}
