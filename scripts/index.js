const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const page = document.querySelector('.page');
const elementsList = document.querySelector('.elements__list'); // Находим блок списка карточек
const cardTemplate = document.querySelector('#template-card').content;
//Окно редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const openEditPopup = document.querySelector('.profile__button_type_edit'); // Находим кнопку для открытия popup
const profileName = document.querySelector('.profile__name'); // Находим блок с именем
const profileDesc = document.querySelector('.profile__description'); // Находим блок с описанием
const inputUserName = popupEdit.querySelector('.popup__input_type_username');
const inputUserDescription = popupEdit.querySelector('.popup__input__type_description');
const closeEditButton = popupEdit.querySelector('.popup__close'); // Находим кнопку для закрытия popup
//Окно добавления фотографии
const popupAdd = document.querySelector('.popup_type_photo');
const openAddPopup = document.querySelector('.profile__button_type_add');
const closeAddButton = popupAdd.querySelector('.popup__close');
//Инпуты окна добавления фотографии
const popupInputCardName = document.querySelector('.popup__input_type_name');
const popupInputCardSrc = document.querySelector('.popup__input_type_src');
//Окно просмотра фотографии
const popupZoom = document.querySelector('.popup_type_zoom');
const zoomingImage = popupZoom.querySelector('.popup__image');
const zoomingFigcaption = popupZoom.querySelector('.popup__figcaption');
const closeZoomButton = popupZoom.querySelector('.popup__close');

const formEditProfile = popupEdit.querySelector('.popup__form'); // Находим форму в DOM
const formAddPhoto = popupAdd.querySelector('.popup__form');

// Напишем функцию открытия
const openPopup = (popup) => {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('mousedown', closeByClick);
}
// Наишем функцию закрытия окна
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
// Напишем фугкцию загрузки данных
const popupLoadData = () => {
  inputUserName.value = profileName.textContent;
  inputUserDescription.value = profileDesc.textContent;
}

const formSubmitEdit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileDesc.textContent = inputUserDescription.value;
  closePopup(popupEdit);
}
//Добавление данных новой карточки
const formSubmitAdd = (evt) => {
  evt.preventDefault();
  const cardName = popupInputCardName.value;
  const cardImage = popupInputCardSrc.value;
  renderCard(cardName, cardImage);
  closePopup(popupAdd);
}
const renderCard = (cardName, cardImage) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.elements__image');
  const cardElementLike = cardElement.querySelector('.elements__item');
  cardElement.querySelector('.elements__header').textContent = cardName;
  cardElementImage.setAttribute('src', cardImage);
  cardElementImage.addEventListener('click', () => {
    page.classList.add('page_overflowed')
    zoomingImage.setAttribute('src', cardImage);
    zoomingImage.setAttribute('alt', cardName);
    zoomingFigcaption.textContent = cardName;
    openPopup(popupZoom);
  });
  cardElementLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like_active');
  })
  cardElement.querySelector('.elements__delete').addEventListener('click', deleteCard);
  elementsList.prepend(cardElement)
}
const deleteCard = (evt) => {
  const card = evt.target.closest('.elements__item');
  card.remove();
}
const renderAll = () => {
  initialCards.forEach((el) => {
    renderCard(el.name, el.link)
  })
}
//Окно добавления фотографий
openAddPopup.addEventListener('click', () => {
  const buttonElement = formAddPhoto.querySelector('.popup__button');
  const inputErrors = popupAdd.querySelectorAll('.popup__input_type_error');
  popupInputCardName.value = '';
  popupInputCardSrc.value = '';
  inputErrors.forEach((elementError) => {
    elementError.textContent = '';
    elementError.classList.remove('popup__input_type_error-active');
  })
  buttonElement.setAttribute('disabled', '');
  openPopup(popupAdd);
});
formEditProfile.addEventListener('submit', formSubmitEdit);
closeAddButton.addEventListener('click', () => {
  closePopup(popupAdd)
});
//Окно редактирования личных данных
openEditPopup.addEventListener('click', () => {
  popupLoadData();
  const inputErrors = popupEdit.querySelectorAll('.popup__input_type_error');
  inputErrors.forEach((elementError) => {
    elementError.textContent = '';
    elementError.classList.remove('popup__input_type_error-active');
  })
  openPopup(popupEdit);
});
formAddPhoto.addEventListener('submit', formSubmitAdd);
closeEditButton.addEventListener('click', () => {
  closePopup(popupEdit);
});
//Зум фотографии
closeZoomButton.addEventListener('click', () => {
  page.classList.remove('page_overflowed');
  closePopup(popupZoom);
  zoomingImage.removeAttribute('src');
  zoomingImage.removeAttribute('alt');
  zoomingFigcaption.textContent = '';
});

renderAll();
