export class Card {
  constructor(name, link, cardSelector, {handleClick}) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleClick = handleClick;
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
  }
  _setEventListeners() {
    // Удаление карточки (Находим селектор кнопки -> Вешаем событие -> Возвращаем метод _deleteCard)
    this._element.querySelector('.elements__delete').addEventListener('click', ()=> {
      return this._deleteCard();
    })
    // Лайк карточки (Находим селектор кнопки -> Вешаем событие -> Возвращаем метод _likeCard)
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      return this._likeCard();
    })
    // Превью карточки (Находим селектор -> Вешаем событие -> Возвращаем метод _previewCard)
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleClick(this._name, this._link);
    })
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__header').textContent = this._name;
    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__image').alt = this._name;
    return this._element;
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

}
