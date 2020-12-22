import * as data from '../utils/config.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';

// Отрисовываем список
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

// Окно добавления фотографии
const formAddPhotoValidator = new FormValidator(data.params, data.params.formAddPhoto);
formAddPhotoValidator.enableValidation();
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
data.openAddPopup.addEventListener('click', () => {                 // Вешаем слушатель события на открытие окна редактирования
  openPopupAddForm.open();
})

// Окно редактирования профиля
const formEditProfileValidator = new FormValidator(data.params, data.params.formEditProfile);
formEditProfileValidator.enableValidation();
data.openEditPopup.addEventListener('click', () => {                // Вешаем обработчик события
  formEditProfileValidator.disableButton();               
  const openUserPopup = new Popup(data.popupEdit);   
  openUserPopup.open();                                             // Вызываем метод открытия popup
  const openUserInfo = new UserInfo({userName: data.profileName.textContent, userDescription: data.profileDesc.textContent});
  openUserInfo.getUserInfo();                                       // Загружаем в input данные пользователя
  openUserPopup.setEventListeners();                                // Передаем слушатели событий
  data.formEditProfile.addEventListener('submit', (evt) => {  
    evt.preventDefault();
    openUserInfo.setUserInfo();
    openUserPopup.close();
  })
});


