export const initialCards = [
  {
    name: 'Архыз',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export const params =  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: '.popup__input_type_error',
  errorClass: 'popup__input_type_error-active',
  formEditProfile: '.popup_type_edit',
  formAddPhoto: '.popup_type_photo'
}
export const page = document.querySelector('.page');
export const elementsList = document.querySelector('.elements__list'); // Находим блок списка карточек
//Окно редактирования профиля
export const popupEdit = document.querySelector('.popup_type_edit');
export const openEditPopup = document.querySelector('.profile__button_type_edit'); // Находим кнопку для открытия popup
export const profileName = document.querySelector('.profile__name'); // Находим блок с именем
export const profileDesc = document.querySelector('.profile__description'); // Находим блок с описанием
export const inputUserName = popupEdit.querySelector('.popup__input_type_username');
export const inputUserDescription = popupEdit.querySelector('.popup__input__type_description');
export const closeEditButton = popupEdit.querySelector('.popup__close'); // Находим кнопку для закрытия popup
//Окно добавления фотографии
export const popupAdd = document.querySelector('.popup_type_photo'); 
export const openAddPopup = document.querySelector('.profile__button_type_add');
export const closeAddButton = popupAdd.querySelector('.popup__close');
//Инпуты окна добавления фотографии
export const popupInputCardName = document.querySelector('.popup__input_type_name');
export const popupInputCardSrc = document.querySelector('.popup__input_type_src');
//Окно просмотра фотографии
export const popupZoom = document.querySelector('.popup_type_zoom'); 
export const zoomingImage = popupZoom.querySelector('.popup__image');
export const zoomingFigcaption = popupZoom.querySelector('.popup__figcaption');
export const closeZoomButton = popupZoom.querySelector('.popup__close');

export const formEditProfile = popupEdit.querySelector('.popup__form'); // Находим форму в DOM
export const formAddPhoto = popupAdd.querySelector('.popup__form');
