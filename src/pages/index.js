import './index.css';

import * as data from '../utils/config.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm.js'
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  address: 'https://mesto.nomoreparties.co', 
  token: 'd8d1cc1a-fc60-4366-9dd1-cd8eb0d5a40e', 
  groupId: 'cohort-19'
});
const popupWithImage = new PopupWithImage(data.params.popupZoom, data.params.zoomingImage, data.params.zoomingFigcaption);
popupWithImage.setEventListeners();
const popupConfirmDel = new PopupConfirm(data.params.popupConfirm);
popupConfirmDel.setEventListeners();

const userInfo = new UserInfo({
  userName: data.profileName, 
  userDescription: data.profileDesc,
  userAvatar: data.avatarButton,
});
let currentUserId;
Promise.all([
  api.getUser(),
  api.getCards()
]).then(res => {
  userInfo.setUserInfo(res[0]); // Загружаем данные пользователя
  currentUserId = res[0]._id;
  console.log(res[0])
  cardList.rendererItems(res[1]); // Загружаем карточки пользователей
}).catch(err => {
  console.log(`Error: ${err}`);
})
const createCard = (result) => {
  const card = new Card(result, currentUserId, '#template-card', 
  {
    handleClick: () => {
      popupWithImage.open(result.name, result.link);
    },
    handleDelete: () => {
      popupConfirmDel.setSubmitAction(() => {
        api.removeCard(card.getId()).then((result) => {
          card.removeCard(result);
          popupConfirmDel.close();
        }).catch(err => {
          console.log(err)
        })
      });
      popupConfirmDel.open();
    },
    handleLike: (isLiked) => {
      if(isLiked) {
        api.dislikeCard(card.getId()).then((result) => {
          card.setLikes(result.likes)
          console.log(result.likes)
        }).catch(err => {
          console.log(err);
        })
      } else {
        api.likeCard(card.getId()).then(result => {
          card.setLikes(result.likes)
          console.log(result.likes)
        }).catch(err => {
          console.log(err)
        })
      }   
    }
  });
  const cardItem = card.generateCard();

  return cardItem
}


const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
    }
}, data.params.elementsList);

// Окно добавления фотографии
const formAddPhotoValidator = new FormValidator(data.params, data.params.formAddPhoto);
formAddPhotoValidator.enableValidation();
const popupAddForm = new PopupWithForm(data.params.formAddPhoto, {
  handleSubmitForm: (item) => {
    api.addNewCard(item.place, item.url).then(result => {
      cardList.addItem(createCard(result));
      popupAddForm.close();
    })

  }});

// Окно редактирования профиля
const formEditProfileValidator = new FormValidator(data.params, data.params.formEditProfile);
formEditProfileValidator.enableValidation();       
const userPopupForm = new PopupWithForm(data.params.formEditProfile, {
  handleSubmitForm: (item) => {
    api.updateUser(item).then(result => {
      userInfo.setUserInfo(result);
      userPopupForm.close(); 
    })               
}});  

const formAddAvatarValidator = new FormValidator(data.params, data.params.popupAvatar);
formAddAvatarValidator.enableValidation();
const popupEditAvatar = new PopupWithForm(data.params.popupAvatar, {
  handleSubmitForm: (item) => {
    console.log(item);
    api.updateAvatar(item).then(result => {
      userInfo.setUserInfo(result);
      popupEditAvatar.close();
    })
  }
}) 

popupAddForm.setEventListeners();
data.openAddPopup.addEventListener('click', () => {
  formAddPhotoValidator.disableButton();
  formAddPhotoValidator.clearErrors();
  popupAddForm.open();
})

userPopupForm.setEventListeners();  
data.openEditPopup.addEventListener('click', () => {                
  formEditProfileValidator.disableButton();
  formEditProfileValidator.clearErrors();
  userPopupForm.open();
  const userData = userInfo.getUserInfo();
  data.inputUserName.value = userData.name;
  data.inputUserDescription.value = userData.description;
}); 

popupEditAvatar.setEventListeners();
data.avatarButton.addEventListener('click', () => {
  formAddAvatarValidator.disableButton()
  formAddAvatarValidator.clearErrors();
  popupEditAvatar.open();
})

