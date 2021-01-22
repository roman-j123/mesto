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
  userAvatar: data.profileAvatar,
});
let currentUserId;
Promise.all([
  api.getUser(),
  api.getCards()
]).then(res => {
  userInfo.setUserInfo(res[0]); // Загружаем данные пользователя
  currentUserId = res[0]._id;
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
    popupAddForm.isLoading(true);
    api.addNewCard(item.place, item.url).then(result => {
      cardList.addItem(createCard(result));
      popupAddForm.close();
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      popupAddForm.isLoading(false);
    })
  }});

// Окно редактирования профиля
const formEditProfileValidator = new FormValidator(data.params, data.params.formEditProfile);
formEditProfileValidator.enableValidation();       
const userPopupForm = new PopupWithForm(data.params.formEditProfile, {
  handleSubmitForm: (item) => {
    userPopupForm.isLoading(true);
    api.updateUser(item).then(result => {
      userInfo.setUserInfo(result);
      userPopupForm.close(); 
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      userPopupForm.isLoading(false);
    })          
}});  

const formAddAvatarValidator = new FormValidator(data.params, data.params.popupAvatar);
formAddAvatarValidator.enableValidation();
const popupEditAvatar = new PopupWithForm(data.params.popupAvatar, {
  handleSubmitForm: (item) => {
    popupEditAvatar.isLoading(true);
    api.updateAvatar(item).then(result => {
      userInfo.setUserInfo(result);
      popupEditAvatar.close();
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      popupEditAvatar.isLoading(false);
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
data.profileAvatarButton.addEventListener('click', () => {
  formAddAvatarValidator.disableButton()
  formAddAvatarValidator.clearErrors();
  popupEditAvatar.open();
})

