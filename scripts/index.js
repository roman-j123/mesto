import * as data from './config.js';
import { Card } from './Card.js';
import { FormValidator } from "./FormValidator.js";

// Функция добовления карточки в конец списка
const prepend = (element) => {
  return data.elementsList.prepend(element);
}
// Перебераем массив где каждому item присваиваем name, link, cardSelector
data.initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '#template-card');
  const cardItem = card.generateCard();
  prepend(cardItem);
})
//Добавление данных новой карточки
const formSubmitAdd = (evt) => {
  evt.preventDefault();
  const card = new Card(data.popupInputCardName.value, data.popupInputCardSrc.value,  '#template-card')
  const cardItem = card.generateCard();
  prepend(cardItem);
  closePopup(data.popupAdd);
}
// Функция открытия окна
export const openPopup = (popup) => {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('mousedown', closeByClick);
}
// Функции закрытия окна
const closePopup = (popup) => {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('mousedown', closeByClick);
}
const closeByEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_open');
  if(evt.key === 'Escape') {
    closePopup(openedPopup, evt);
  }
}
const closeByClick = (evt) => {
  const openedPopup = document.querySelector('.popup_open');
  if(evt.currentTarget === evt.target) {
    closePopup(openedPopup, evt);
  }
}

// Подгружаем данные в попап
const popupLoadData = () => {
  data.inputUserName.value = data.profileName.textContent;
  data.inputUserDescription.value = data.profileDesc.textContent;
}
// Отправляем данные мз попап
const formSubmitEdit = (evt) => {
  evt.preventDefault();
  data.profileName.textContent = data.inputUserName.value;
  data.profileDesc.textContent = data.inputUserDescription.value;
  closePopup(data.popupEdit);
}
//Окно добавления фотографий
data.openAddPopup.addEventListener('click', () => {
  const buttonElement = data.formAddPhoto.querySelector('.popup__button');
  const inputErrors = data.popupAdd.querySelectorAll('.popup__input_type_error');
  data.popupInputCardName.value = '';
  data.popupInputCardSrc.value = '';
  inputErrors.forEach((elementError) => {
    elementError.textContent = '';
    elementError.classList.remove('popup__input_type_error-active');
  })
  buttonElement.setAttribute('disabled', '');
  openPopup(data.popupAdd);
});
data.formEditProfile.addEventListener('submit', formSubmitEdit);
data.closeAddButton.addEventListener('click', () => {
  closePopup(data.popupAdd)
});
//Окно редактирования личных данных
data.openEditPopup.addEventListener('click', () => {
  popupLoadData();
  const inputErrors = data.popupEdit.querySelectorAll('.popup__input_type_error');
  inputErrors.forEach((elementError) => {
    elementError.textContent = '';
    elementError.classList.remove('popup__input_type_error-active');
  })
  openPopup(data.popupEdit);
});
data.formAddPhoto.addEventListener('submit', formSubmitAdd);
data.closeEditButton.addEventListener('click', () => {
  closePopup(data.popupEdit);
});
data.closeZoomButton.addEventListener('click', () => {
  data.page.classList.remove('page_overflowed');
  closePopup(data.popupZoom);
  data.zoomingImage.removeAttribute('src');
  data.zoomingImage.removeAttribute('alt');
  data.zoomingFigcaption.textContent = '';
});

const formEditProfileValidator = new FormValidator(data.params, data.params.formEditProfile);
formEditProfileValidator.enableValidation();
const formAddPhotoValidator = new FormValidator(data.params, data.params.formAddPhoto);
formAddPhotoValidator.enableValidation();
