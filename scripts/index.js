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
const elementsList = document.querySelector('.elements__list'); // Находим блок списка карточек
const profileName = document.querySelector('.profile__name'); // Находим блок с именем
const profileDesc = document.querySelector('.profile__description'); // Находим блок с описанием
const popup = document.querySelector('.popup'); // Находим блок popup
const popupAdd = document.querySelector('.popup_type_photo');
const popupEdit = document.querySelector('.popup_type_edit');
const popupSave = popupEdit.querySelector('.popup__button');
const popupSavePhoto = popupAdd.querySelector('.popup__button');
const openEditPopup = document.querySelector('.profile__button_type_edit'); // Находим кнопку для открытия popup
const openAddPopup = document.querySelector('.profile__button_type_add');
const closeAddButton = popupAdd.querySelector('.popup__close');
const closeEditButton = popupEdit.querySelector('.popup__close'); // Находим кнопку для закрытия popup
const formElement = popup.querySelector('.popup__form'); // Находим форму в DOM
const popupInput = formElement.querySelectorAll('.popup__input'); // Находим input в DOM
//Находим инпуты
const popupInputCardName = document.querySelector('.popup__input_type_name');
const popupInputCardSrc = document.querySelector('.popup__input_type_src');
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

const formSubmitAdd = (evt) => {
  evt.preventDefault();
  const cardName = popupInputCardName.value;
  const cardImage = popupInputCardSrc.value;
  initialCards.push({name: cardName, link: cardImage});
  render();
  closePopup(popupAdd);
}

const render = () => {
  elementsList.innerHTML = " ";
  initialCards.forEach(renderCard);
}

const renderCard = (el) => {
  const cardTemplate = document.querySelector('#template-card').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.elements__image').setAttribute('src', el.link);
  cardElement.querySelector('.elements__image').setAttribute('alt', el.name);
  cardElement.querySelector('.elements__header').textContent = el.name;
  elementsList.prepend(cardElement);
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
render();
