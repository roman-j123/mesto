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
const popup = document.querySelector('.popup'); // Находим блок popup
//Окно редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const openEditPopup = document.querySelector('.profile__button_type_edit'); // Находим кнопку для открытия popup
const profileName = document.querySelector('.profile__name'); // Находим блок с именем
const profileDesc = document.querySelector('.profile__description'); // Находим блок с описанием
const popupSave = popupEdit.querySelector('.popup__button');
const closeEditButton = popupEdit.querySelector('.popup__close'); // Находим кнопку для закрытия popup
//Окно добавления фотографии
const popupAdd = document.querySelector('.popup_type_photo');
const openAddPopup = document.querySelector('.profile__button_type_add');
const closeAddButton = popupAdd.querySelector('.popup__close');
const popupSavePhoto = popupAdd.querySelector('.popup__button');
//Инпуты окна добавления фотографии
const popupInputCardName = document.querySelector('.popup__input_type_name');
const popupInputCardSrc = document.querySelector('.popup__input_type_src');
//Окно просмотра фотографии
const popupZoom = document.querySelector('.popup_type_zoom');
const zoomingImage = popupZoom.querySelector('.popup__image');
const zoomingFigcaption = popupZoom.querySelector('.popup__figcaption');
const closeZoomButton = popupZoom.querySelector('.popup__close');

const formElement = popup.querySelector('.popup__form'); // Находим форму в DOM
const popupInput = formElement.querySelectorAll('.popup__input'); // Находим input в DOM

// Напишем функцию открытия
const openPopup = (popup) => {
  popup.classList.add('popup_open');
}
// Наишем функцию закрытия окна
const closePopup = (popup) => {
  popup.classList.remove('popup_open');
}
// Напишем фугкцию загрузки данных
const popupLoadData = () => {
  popupInput[0].value = profileName.textContent;
  popupInput[1].value = profileDesc.textContent;
}

const formSubmitEdit = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInput[0].value;
  profileDesc.textContent = popupInput[1].value;
  closePopup(popupEdit);
}
//Добавление данных новой карточки
const formSubmitAdd = (evt) => {
  evt.preventDefault();
  let cardName = popupInputCardName.value;
  let cardImage = popupInputCardSrc.value;
  initialCards.push({name: cardName, link: cardImage});
  renderCard(cardName, cardImage, initialCards.length - 1);
  closePopup(popupAdd);
  popupInputCardName.value = '';
  popupInputCardSrc.value = '';
}
const renderCard = (cardName, cardImage, cardIndex) => {
  const cardTemplate = document.querySelector('#template-card').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.elements__header').textContent = cardName;
  cardElement.querySelector('.elements__image').setAttribute('src', cardImage);
  cardElement.querySelector('.elements__image').addEventListener('click', () => {
    page.classList.add('page_overflowed')
    zoomingImage.setAttribute('src', cardImage);
    zoomingImage.setAttribute('alt', cardName);
    zoomingFigcaption.textContent = cardName;
    openPopup(popupZoom);
  });
  cardElement.querySelector('.elements__item').setAttribute('data-id', cardIndex);
  cardElement.querySelector('.elements__like').addEventListener('click', (evt )=> {
    evt.target.classList.toggle('elements__like_active');
  })
  cardElement.querySelector('.elements__delete').addEventListener('click', deleteCard);
  elementsList.prepend(cardElement)
}
const deleteCard = (evt) => {
  let obj = evt.target.parentNode;
  let index = obj.getAttribute('data-id');
  initialCards.splice(index, 1);
  obj.remove();
}
const renderAll = () => {
  initialCards.map((el, index) => {
    return renderCard(el.name, el.link, index);
  })
}
//Окно редактирования
popupLoadData();
openAddPopup.addEventListener('click', () => {openPopup(popupAdd)});
popupSave.addEventListener('click', formSubmitEdit);
closeAddButton.addEventListener('click', () => {closePopup(popupAdd)});
//Окно добавления
openEditPopup.addEventListener('click', () => {openPopup(popupEdit)});
popupSavePhoto.addEventListener('click', formSubmitAdd);
closeEditButton.addEventListener('click', () => {closePopup(popupEdit)});
//Зум фотографии
closeZoomButton.addEventListener('click', () => {
  page.classList.remove('page_overflowed');
  closePopup(popupZoom);
  zoomingImage.removeAttribute('src');
  zoomingImage.removeAttribute('alt');
  zoomingFigcaption.textContent = '';
});
renderAll();
