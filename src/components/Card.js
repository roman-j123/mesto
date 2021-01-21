export class Card {
  constructor(data, currentUserId ,cardSelector, {handleClick, handleDelete, handleLike}) {
    this._name = data.name;
    this._link = data.link;
    this._userId = data.owner._id;
    this._cardId = data._id;
    this._likesArr = data.likes;
    this._currentUserId = currentUserId;
    this._cardSelector = cardSelector;
    this._handleClick = handleClick;
    this._hadleDelete = handleDelete;
    this._handleLike = handleLike;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardElementLike = this._element.querySelector('.elements__like');
    this._cardElementLikeCounter = this._element.querySelector('.elements__like-counter');
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
    this.setLikes(this._likesArr)
    return this._element;
  }
  _setEventListeners() {
    // Удаление карточки (Находим селектор кнопки -> Вешаем событие -> Возвращаем метод _deleteCard)
    this._cardElementDelete.addEventListener('click', ()=> {
    this._hadleDelete(this._cardId);
    })
    // Лайк карточки (Находим селектор кнопки -> Вешаем событие -> Возвращаем метод _likeCard)
    this._cardElementLike.addEventListener('click', () => {
    this._handleLike(this.chekLikes())
    this._cardElementLike.classList.toggle('elements__like_active')
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
  getId() {
    return this._cardId;
  }
  removeCard() {
    return this._deleteCard();
  }
  setLikes(likesArray) {
    this._likes = likesArray;
    this._cardElementLikeCounter.textContent = this._likes.length;
    for(let i = 0; i < this._likes.length; i++) {
      if(this._likes[i]._id == this._currentUserId) {
        this._cardElementLike.classList.add('elements__like_active');
        break; 
      } else {
        this._cardElementLike.classList.remove('elements__like_active');
      }
    }
  }
  chekLikes() { 
    return this._cardElementLike.classList.contains('elements__like_active')
  }
}
