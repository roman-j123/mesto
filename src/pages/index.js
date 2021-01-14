import './index.css';

import * as data from '../utils/config.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import UserInfo from '../components/UserInfo.js';

//Создаем экземпляры карточек
const openPopupWithImage = new PopupWithImage(data.params.popupZoom, data.params.zoomingImage, data.params.zoomingFigcaption);
openPopupWithImage.setEventListeners();

const openUserInfo = new UserInfo({userName: data.profileName, userDescription: data.profileDesc});

const createCard = (item) => {
  const card = new Card(item.place, item.url, '#template-card', 
  {handleClick: () => {
    openPopupWithImage.open(item.place, item.url);
  }});
  const cardItem = card.generateCard();
  return cardItem
}

// Отрисовываем список
const cardList = new Section({
  items: data.initialCards,
  renderer: (item) => {
  // Передаем класс зума карточки
    cardList.addItem(createCard(item));
  }
}, data.params.elementsList)
cardList.rendererItems();

// Окно добавления фотографии
const formAddPhotoValidator = new FormValidator(data.params, data.params.formAddPhoto);
formAddPhotoValidator.enableValidation();
const openPopupAddForm = new PopupWithForm(data.params.formAddPhoto, {
  handleSubmitForm: (item) => {
    cardList.addItem(createCard(item));
    openPopupAddForm.close();
  }
});
openPopupAddForm.setEventListeners();
data.openAddPopup.addEventListener('click', () => {
  openPopupAddForm.open();
})

// Окно редактирования профиля
const formEditProfileValidator = new FormValidator(data.params, data.params.formEditProfile);
formEditProfileValidator.enableValidation();

data.openEditPopup.addEventListener('click', () => {                
  formEditProfileValidator.disableButton();               
  
  const openUserPopup = new PopupWithForm(data.params.formEditProfile, {
    handleSubmitForm: (item) => {
      openUserInfo.setUserInfo(item);
      openUserPopup.close();
    }});
  openUserPopup.open();
  const userData = openUserInfo.getUserInfo();
  data.inputUserName.value = userData.name;
  data.inputUserDescription.value = userData.description;                                           
  openUserPopup.setEventListeners();                                
});


