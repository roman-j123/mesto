export class Card {
  constructor(data, currentUserId ,cardSelector, {handleClick, handleDelete}) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = data.owner._id;
    this._currentUserId = currentUserId;
    this._cardSelector = cardSelector;
    this._handleClick = handleClick;
    this._hadleDelete = handleDelete;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardElementLike = this._element.querySelector('.elements__like');
    this._cardElementDelete = this._element.querySelector('.elements__delete');
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
    if(this._userId !== this._currentUserId) {
      this._cardElementDelete.style.display = 'none';
    }
    return this._element;
  }
  _setEventListeners() {
    // Удаление карточки (Находим селектор кнопки -> Вешаем событие -> Возвращаем метод _deleteCard)
    this._cardElementDelete.addEventListener('click', ()=> {
    this._hadleDelete(this._cardId);
    })
    // Лайк карточки (Находим селектор кнопки -> Вешаем событие -> Возвращаем метод _likeCard)
    this._cardElementLike.addEventListener('click', () => {
    this._likeCard();
    })
    // Превью карточки (Находим селектор -> Вешаем событие -> Возвращаем метод _previewCard)
    this._cardImage.addEventListener('click', () => {
    this._handleClick(this._name, this._link);
    })
  }
  // Метод удаления карточки (Возвращаем удаление разметки карточки)
  _deleteCard() {
    this._element.remove();
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
