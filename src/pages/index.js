import './index.css';

import * as data from '../utils/config.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  address: 'https://mesto.nomoreparties.co', 
  token: 'd8d1cc1a-fc60-4366-9dd1-cd8eb0d5a40e', 
  groupId: 'cohort-19'
});

  //Создаем экземпляры карточек
const popupWithImage = new PopupWithImage(data.params.popupZoom, data.params.zoomingImage, data.params.zoomingFigcaption);
popupWithImage.setEventListeners();

const userInfo = new UserInfo({userName: data.profileName, userDescription: data.profileDesc});

const createCard = (item) => {
  const card = new Card(item.place, item.url, '#template-card', 
  {handleClick: () => {
    popupWithImage.open(item.place, item.url);
  }});
  const cardItem = card.generateCard();
  return cardItem
}

// Отрисовываем список
/*const cardList = new Section({
  items: data.initialCards,
  renderer: (item) => {
  // Передаем класс зума карточки
    cardList.addItem(createCard(item));
  }
}, data.params.elementsList)
cardList.rendererItems();
*/
api.getCards().then(result => {
  const cardList = new Section({
    renderer: (item) => {
      cardList.addItem(createCard(item))
      }
    }, data.params.elementsList);
    cardList.rendererItems(result);
    console.log(result);
  });
// Окно добавления фотографии
const formAddPhotoValidator = new FormValidator(data.params, data.params.formAddPhoto);
formAddPhotoValidator.enableValidation();

const popupAddForm = new PopupWithForm(data.params.formAddPhoto, {
  handleSubmitForm: (item) => {
    cardList.addItem(createCard(item));
    popupAddForm.close();
  }});
popupAddForm.setEventListeners();
data.openAddPopup.addEventListener('click', () => {
  formAddPhotoValidator.disableButton();
  formAddPhotoValidator.clearErrors();
  popupAddForm.open();
})

// Окно редактирования профиля
const formEditProfileValidator = new FormValidator(data.params, data.params.formEditProfile);
formEditProfileValidator.enableValidation();
        
const userPopupForm = new PopupWithForm(data.params.formEditProfile, {
  handleSubmitForm: (item) => {
    userInfo.setUserInfo(item);
    userPopupForm.close();                
}});              
userPopupForm.setEventListeners();  
data.openEditPopup.addEventListener('click', () => {                
  formEditProfileValidator.disableButton();
  formEditProfileValidator.clearErrors();
  userPopupForm.open();
  const userData = userInfo.getUserInfo();
  data.inputUserName.value = userData.name;
  data.inputUserDescription.value = userData.description;
}); 
