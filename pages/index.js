import * as data from '../utils/config.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';

// Функция добовления карточки в конец списка
/*
const prepend = (element) => {
  return data.elementsList.prepend(element);
}
*/
//Добавление данных новой карточки
/*
const formSubmitAdd = (evt) => {
  evt.preventDefault();
  const card = new Card(data.popupInputCardName.value, data.popupInputCardSrc.value,  '#template-card')
  const cardItem = card.generateCard();
  prepend(cardItem);
  closePopup(data.popupAdd);
}
*/
// Функция открытия окна

/*
export const openPopup = (popup) => {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('mousedown', closeByClick);
}
*/

// Функции закрытия окна
/*const closePopup = (popup) => {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('mousedown', closeByClick);
} */
/*const closeByEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_open');
  if(evt.key === 'Escape') {
    closePopup(openedPopup, evt);
  }
}*/
/*const closeByClick = (evt) => {
  const openedPopup = document.querySelector('.popup_open');
  if(evt.currentTarget === evt.target) {
    closePopup(openedPopup, evt);
  }
}*/

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

/*data.openAddPopup.addEventListener('click', () => {
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
*/
//data.formEditProfile.addEventListener('submit', formSubmitEdit);
/*data.closeAddButton.addEventListener('click', () => {
  closePopup(data.popupAdd)
});
*/


/*
Окно редактирования личных данных

data.openEditPopup.addEventListener('click', () => {
  popupLoadData();
  const inputErrors = data.popupEdit.querySelectorAll('.popup__input_type_error');
  inputErrors.forEach((elementError) => {
    elementError.textContent = '';
    elementError.classList.remove('popup__input_type_error-active');
  })
  openPopup(data.popupEdit);
});
*/


/*
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
*/

const cardList = new Section({
  items: data.initialCards,                                         // Передаем данные карточки
  renderer: (item) => {                                             // Функция отрисовки карточки
    const openPopupWithImage = new PopupWithImage(data.popupZoom);  // Передаем класс зума карточки
    const card = new Card(item.name, item.url, '#template-card',    // Создаем карточку (Название, ссылка, шаблон)
    {handleClick: () => {                                           // Создаем объект с методом открытия и событиями
      openPopupWithImage.open(item.name, item.url);                 // Передаем метод открытия popup
      openPopupWithImage.setEventListeners();                       // Передаём слушатели событий
    }});
    const cardItem = card.generateCard();                           // Генерируем карточку
    cardList.addItem(cardItem);                                     // Добавлякм готовую карточку
  }
}, data.elementsList)                                               // Определяем куда вставляются карточки
cardList.rendererItems();


data.openAddPopup.addEventListener('click', () => {                 // Вешаем слушатель события на открытие окна редактирования
  openPopupAddForm.open();
})
const openPopupAddForm = new PopupWithForm(data.popupAdd, {         // Передаем селектор окна с формой
  handleSubmitForm: (item) => {                                     // В объекте передаем коллбек функции
    const card = new Card(item.name, item.url, '#template-card',    // Создаем новую карточку
    {handleClick: () => {                                           // Генерируем новую карточку
      openPopupWithImage.open(item.name, item.url);                 // Передаем метод открытия popup
      openPopupWithImage.setEventListeners();                       // Передаём слушатели событий
    }});
    const cardItem = card.generateCard();                           // Генерируем карточку
    cardList.addItem(cardItem);                                     // Добавляемготовую карточку
    const openPopupWithImage = new PopupWithImage(data.popupZoom);  // Передаем класс зума карточки
    openPopupAddForm.close();                                       // Передаем метод закрытия окна
  }
});
openPopupAddForm.setEventListeners();

data.openEditPopup.addEventListener('click', () => {                // Вешаем обработчик события
  const openUserPopup = new Popup(data.popupEdit);                  // Создаем Popup
  openUserPopup.open();                                             // Вызываем метод открытия popup
  const openUserInfo = new UserInfo({userName: data.profileName.textContent, userDescription: data.profileDesc.textContent});
  openUserInfo.getUserInfo();
  openUserPopup.setEventListeners();
  data.formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    openUserInfo.setUserInfo();
    openUserPopup.close();
  })
});


const formEditProfileValidator = new FormValidator(data.params, data.params.formEditProfile);
formEditProfileValidator.enableValidation();

const formAddPhotoValidator = new FormValidator(data.params, data.params.formAddPhoto);
formAddPhotoValidator.enableValidation();

