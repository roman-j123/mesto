export class Card {
  constructor(data, cardSelector, {handleClick, handleDelete}) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleClick = handleClick;
    this._hadleDelete = handleDelete;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardElementLike = this._element.querySelector('.elements__like');
  }
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
  }
  generateCard() {
    this._setEventListeners();
    this._element.querySelector('.elements__header').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    return this._element;
  }
  _setEventListeners() {
    // Удаление карточки (Находим селектор кнопки -> Вешаем событие -> Возвращаем метод _deleteCard)
    this._element.querySelector('.elements__delete').addEventListener('click', ()=> {
    this._hadleDelete(this);
    })
    // Лайк карточки (Находим селектор кнопки -> Вешаем событие -> Возвращаем метод _likeCard)
    this._cardElementLike.addEventListener('click', () => {
      return this._likeCard();
    })
    // Превью карточки (Находим селектор -> Вешаем событие -> Возвращаем метод _previewCard)
    this._cardImage.addEventListener('click', () => {
      return this._handleClick(this._name, this._link);
    })
  }
  // Метод удаления карточки (Возвращаем удаление разметки карточки)
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
  // Метод удаления карточки (Запишем нужный селектор в _cardElementLike -> Добавим класс like)
  _likeCard() {
    return this._cardElementLike.classList.toggle('elements__like_active');
  }
  getId() {
    return this._cardId;
  }
  removeCard() {
    return this._deleteCard();
  }

}
